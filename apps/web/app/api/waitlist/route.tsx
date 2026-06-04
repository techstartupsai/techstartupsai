import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { Resend } from 'resend'
import { render } from 'react-email'
import WaitlistConfirmation from '@techstartups/emails/WaitlistConfirmation'
import AdminSignupNotification from '@techstartups/emails/AdminSignupNotification'
import { createServiceRoleClient } from '@techstartups/db/server'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { requireEnv } from '@/lib/env'
import { buildSignedUnsubscribeUrl } from '@/lib/unsubscribe-token'
import { waitlistRequestSchema } from '@/lib/schemas'

const POSTGRES_UNIQUE_VIOLATION = '23505'

// read once at module load — throws at first request if any are unset, surfacing misconfig before any DB writes happen
const siteUrl = requireEnv('NEXT_PUBLIC_SITE_URL')
const resend = new Resend(requireEnv('RESEND_API_KEY'))

/**
 * Adds an email to the waitlist, sends confirmation and admin notification emails.
 */
export async function POST(request: Request) {
  // parse the request body
  const body: unknown = await request.json()
  const parseResult = waitlistRequestSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 })
  }

  // verify the turnstile token
  const { email, userTypes, turnstileToken } = parseResult.data
  const verification = await verifyTurnstileToken(turnstileToken)
  if (!verification.success) {
    return NextResponse.json(
      { success: false, error: 'Verification failed. Please try again.' },
      { status: 400 }
    )
  }

  // create a new waitlist entry
  const supabase = createServiceRoleClient()
  const insertData: Record<string, unknown> = { email }
  if (userTypes) {
    insertData.user_types = userTypes
  }
  const { error: insertError } = await supabase.from('waitlist').insert(insertData)

  // handle errors
  if (insertError) {
    if (insertError.code === POSTGRES_UNIQUE_VIOLATION) {
      // check if the user previously unsubscribed
      const { data: existingSubscriber, error: selectError } = await supabase
        .from('waitlist')
        .select('unsubscribed_at, user_types')
        .eq('email', email)
        .single()

      if (selectError) {
        Sentry.captureException(selectError)
        return NextResponse.json(
          { success: false, error: 'Already on the waitlist' },
          { status: 409 }
        )
      }

      // build the update payload
      const updateData: Record<string, unknown> = {}
      if (existingSubscriber?.unsubscribed_at) {
        updateData.unsubscribed_at = null
      }
      if (userTypes) {
        updateData.user_types = userTypes
      }

      // nothing to update — active subscriber with no new types
      if (Object.keys(updateData).length === 0) {
        return NextResponse.json(
          { success: false, error: 'Already on the waitlist' },
          { status: 409 }
        )
      }

      const { error: updateError } = await supabase
        .from('waitlist')
        .update(updateData)
        .eq('email', email)

      if (updateError) {
        Sentry.captureException(updateError)
        return NextResponse.json(
          { success: false, error: 'Failed to join the waitlist. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      Sentry.captureException(insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to join the waitlist. Please try again.' },
        { status: 500 }
      )
    }
  }

  // build the admin notification email subject
  const adminSubject =
    userTypes && userTypes.length > 0
      ? `New waitlist signup (${userTypes.join(', ')}): ${email}`
      : 'New waitlist signup'

  // build the signed unsubscribe URL — branded type ensures the email cannot be sent with a raw URL
  const unsubscribeUrl = buildSignedUnsubscribeUrl(siteUrl, email)

  // render and send the waitlist confirmation and notification emails
  try {
    const [confirmationHtml, notificationHtml] = await Promise.all([
      render(<WaitlistConfirmation unsubscribeUrl={unsubscribeUrl} />),
      render(<AdminSignupNotification email={email} userTypes={userTypes} />),
    ])

    await Promise.all([
      // send the waitlist confirmation email to the user
      resend.emails.send({
        from: 'TechStartups AI <hello@techstartups.ai>',
        to: email,
        subject: "You're on the TechStartups AI waitlist",
        html: confirmationHtml,
      }),

      // send a notification email to the admin
      resend.emails.send({
        from: 'TechStartups AI <hello@techstartups.ai>',
        to: 'evan@techstartups.ai',
        subject: adminSubject,
        html: notificationHtml,
      }),
    ])
  } catch (emailError) {
    Sentry.captureException(emailError)
  }

  return NextResponse.json({ success: true })
}
