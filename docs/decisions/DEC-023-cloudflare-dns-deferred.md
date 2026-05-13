# DEC-023: Cloudflare — deferred DNS migration + future rate limiting

- **Status:** Accepted
- **Date:** 2026-04-11
- **Related:** DEC-024

## Context

Vercel provides basic DDoS protection but is not purpose-built for it. Rate limiting and WAF are needed for API routes at scale. Cloudflare's free tier covers DNS, proxying, WAF baseline, DDoS, and Turnstile at no cost.

## Decision

Migrate domain DNS to Cloudflare (free tier) when pulled from deferred. Use Cloudflare as the rate limiting and WAF layer in front of Vercel. Not urgent pre-launch — Vercel's built-in protection is sufficient at current scale.

**Phases:**

- DNS only: point nameservers to Cloudflare (~10 min). Google Workspace MX records must stay unproxied.
- Pre/post launch: rate limiting rules on `/api/waitlist`, `/api/unsubscribe`, future AI routes.
- With auth: Turnstile on waitlist + login forms (see DEC-024).
- Phase 5+: WAF rules, bot scoring, R2 for asset storage if egress costs matter.

## Consequences

- Cloudflare sits in front of Vercel as a reverse proxy — all Cloudflare features require orange-cloud proxying.
- Workers and R2 deferred — no clear win over Vercel Edge today.
- Full WAF ruleset deferred until paying users and real scraping patterns are observed.
