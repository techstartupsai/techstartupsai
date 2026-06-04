import { createHmac, timingSafeEqual } from 'node:crypto'
import type { SignedUnsubscribeUrl } from '@techstartups/emails/WaitlistConfirmation'
import { requireEnv } from './env'

// read once at module load — throws at first import if unset, surfacing misconfig loudly via Sentry
const unsubscribeSecret = requireEnv('UNSUBSCRIBE_SECRET')

/**
 * Generates a URL-safe HMAC-SHA256 token binding the email to the UNSUBSCRIBE_SECRET.
 * Identical inputs produce identical tokens — deterministic, no nonce.
 */
export function signUnsubscribeToken(email: string): string {
  return createHmac('sha256', unsubscribeSecret).update(email).digest('base64url')
}

/**
 * Builds the signed unsubscribe URL embedded in waitlist emails — the only place that
 * mints a SignedUnsubscribeUrl. Callers cannot construct one without going through here.
 */
export function buildSignedUnsubscribeUrl(siteUrl: string, email: string): SignedUnsubscribeUrl {
  const token = signUnsubscribeToken(email)
  return `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}&token=${token}` as SignedUnsubscribeUrl
}

/**
 * Returns true iff the token is a valid HMAC for this email under the current secret.
 * Comparison is constant-time to avoid leaking the expected token via timing.
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expectedToken = signUnsubscribeToken(email)
  const candidateBuffer = Buffer.from(token, 'base64url')
  const expectedBuffer = Buffer.from(expectedToken, 'base64url')
  // pad-and-compare matches constantTimeEquals pattern — uniform across the codebase regardless of whether the expected length is secret
  const paddedCandidate = Buffer.alloc(expectedBuffer.length)
  candidateBuffer.copy(
    paddedCandidate,
    0,
    0,
    Math.min(candidateBuffer.length, expectedBuffer.length)
  )
  const contentMatches = timingSafeEqual(paddedCandidate, expectedBuffer)
  return contentMatches && candidateBuffer.length === expectedBuffer.length
}
