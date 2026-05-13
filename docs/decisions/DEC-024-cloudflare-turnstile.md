# DEC-024: Cloudflare Turnstile for waitlist bot protection

- **Status:** Accepted
- **Date:** 2026-04-11
- **Related:** DEC-023

## Context

The waitlist form needs bot protection without adding friction for real users. reCAPTCHA v2 shows visible challenges; reCAPTCHA v3 scores are opaque and feed Google's data ecosystem.

## Decision

Add Cloudflare Turnstile (invisible CAPTCHA) to the waitlist form. No double opt-in.

**How it works:** Turnstile runs a background JS challenge on page load and issues a short-lived token on success. The form includes the token in the submission payload. `/api/waitlist` verifies it against Cloudflare's siteverify API before processing. Bots without a valid token receive a 400.

## Consequences

- Real users never see anything — zero friction.
- No double opt-in: avoids 20–40% signup drop-off from confirmation link abandonment. Turnstile handles bot spam at the form level.
- Does not require Cloudflare DNS — works on any domain as a standalone product.
- Turnstile should also be added to auth forms (login, signup) when auth lands.
- Turnstile requires `TURNSTILE_SECRET_KEY` env var on the server; `NEXT_PUBLIC_TURNSTILE_SITE_KEY` on the client.
