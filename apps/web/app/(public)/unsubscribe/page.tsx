import { redirect } from 'next/navigation'
import { emailSchema } from '@/lib/schemas'
import { verifyUnsubscribeToken } from '@/lib/unsubscribe-token'

interface UnsubscribePageProps {
  searchParams: Promise<{ email?: string; token?: string }>
}

/**
 * Confirmation page reached from the email's unsubscribe link.
 * Verifies the HMAC token, then asks the user to click "Confirm" — a POST that actually
 * mutates state. This pattern defeats email-scanner auto-clicks (Outlook ATP, Gmail) that
 * would otherwise unsubscribe users on link verification.
 */
export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  // validate the email and token from query params
  const { email: emailParam, token: tokenParam } = await searchParams
  const parseResult = emailSchema.safeParse(emailParam)
  if (!parseResult.success || typeof tokenParam !== 'string') {
    redirect('/unsubscribe/invalid')
  }
  const email = parseResult.data

  // verify the HMAC token before showing the confirmation form
  if (!verifyUnsubscribeToken(email, tokenParam)) {
    redirect('/unsubscribe/invalid')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Unsubscribe from TechStartups AI?</h1>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        {`You'll stop receiving emails sent to `}
        <span className="font-medium text-foreground">{email}</span>
        {'.'}
      </p>
      <form method="POST" action="/api/unsubscribe" className="flex justify-center">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="token" value={tokenParam} />
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Confirm unsubscribe
        </button>
      </form>
    </div>
  )
}
