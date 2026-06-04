import { NextRequest } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { redirect } from 'next/navigation'
import { createServiceRoleClient } from '@techstartups/db/server'
import { emailSchema } from '@/lib/schemas'
import { verifyUnsubscribeToken } from '@/lib/unsubscribe-token'

/**
 * Marks a waitlist email as unsubscribed and redirects to the confirmation page.
 * Requires a valid HMAC token and a POST request — defeats email-scanner auto-clicks.
 */
export async function POST(request: NextRequest) {
  // parse the email and token from the form body
  const formData = await request.formData()
  const emailParam = formData.get('email')
  const tokenParam = formData.get('token')

  const parseResult = emailSchema.safeParse(emailParam)
  if (!parseResult.success || typeof tokenParam !== 'string') {
    redirect('/unsubscribe/invalid')
  }
  const email = parseResult.data

  // verify the HMAC token before touching the database
  if (!verifyUnsubscribeToken(email, tokenParam)) {
    redirect('/unsubscribe/invalid')
  }

  // update the waitlist entry with the unsubscribed_at timestamp
  const supabase = createServiceRoleClient()
  const { error: updateError } = await supabase
    .from('waitlist')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('email', email)
    .is('unsubscribed_at', null)

  if (updateError) {
    Sentry.captureException(updateError)
  }

  redirect('/unsubscribed')
}
