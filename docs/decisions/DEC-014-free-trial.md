# DEC-014: Free trial — 14-day auto-converting, card required upfront

- **Status:** Accepted
- **Date:** 2026-04-01
- **Related:** DEC-012, DEC-006

## Context

All three user types need enough time to see real value before being charged. Conversion at trial end must be maximised without adding friction.

## Decision

All paid tiers include a 14-day free trial. Credit card required at signup. Auto-converts to the full paid plan at day 14. One trial per user lifetime (not per type). All discounts (multi-type, annual) apply from day 1 of the trial.

**Email sequence:** Day 0 welcome, Day 7 check-in, Day 12 two-day warning, Day 13 final reminder, Day 14 charge confirmation or cancellation receipt.

## Consequences

- `profiles.trial_used` (bool) prevents gaming via repeated signups.
- `user_subscriptions.trial_ends_at` (timestamptz) tracks per-subscription trial window; null for non-trial subs.
- Feature gating treats `status = 'trialing'` equivalent to `status = 'active'` — never check `status = 'active'` alone.
- Stripe `trial_end` param on subscription creation; `customer.subscription.trial_will_end` webhook triggers day-12 email.
- 7-day trial rejected (too short for investor/founder value cycle); card-optional trial rejected (lower day-14 conversion).
