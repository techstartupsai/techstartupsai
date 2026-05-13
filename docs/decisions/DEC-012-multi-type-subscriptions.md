# DEC-012: Multi-type user subscriptions with combo discounts

- **Status:** Accepted
- **Date:** 2026-04-01
- **Related:** DEC-006, DEC-014

## Context

Real users straddle multiple roles — a founder is often also a job seeker or angel investor. Forcing a single user type creates friction and loses revenue. A user must never lose access to features they already have by paying more.

## Decision

Users can subscribe to any combination of user types (Job Seeker, Founder, Angel) simultaneously at any tier. Each type beyond the first is discounted 25%. Feature access is the union of all active subscriptions. Tier check is `any(active_tier >= required_tier)` across all subscriptions, never a single-row lookup.

## Consequences

- `profiles` no longer stores `user_type` or `subscription_tier`. Replaced by `user_subscriptions` table — one row per user per type, each with its own tier, status, and Stripe subscription ID.
- `primary_user_type` on `profiles` controls default dashboard routing only.
- Stripe: one subscription object per active user type; 25% discount applied via Stripe coupon at checkout.
- Single user type locked at signup rejected (too rigid); separate accounts per role rejected (terrible UX).
