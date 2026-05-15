const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

// discriminated union preserving the reason for failure so callers can log or message differently
export type TurnstileVerificationResult =
  | { success: true }
  | { success: false; reason: 'missing-token' | 'verification-failed' | 'fetch-error' }

/**
 * Verifies a Turnstile token against the Cloudflare siteverify endpoint.
 */
export async function verifyTurnstileToken(
  token: string | undefined
): Promise<TurnstileVerificationResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  // bypass verification in local dev when no secret key is configured
  if (!secret) {
    return { success: true }
  }

  // reject immediately if no token was provided
  if (!token) {
    return { success: false, reason: 'missing-token' }
  }

  // post to cloudflare siteverify and check the result
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    })

    const data = (await response.json()) as { success: boolean }
    return data.success === true
      ? { success: true }
      : { success: false, reason: 'verification-failed' }
  } catch {
    return { success: false, reason: 'fetch-error' }
  }
}
