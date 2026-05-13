# DEC-006: Stripe for subscription billing

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

The product has three user types, each with Free / Tier 1 / Tier 2 plans. Users can subscribe to multiple types simultaneously. Billing needs to support multiple products, multiple price points, and webhook-based status sync.

## Decision

Use Stripe for all subscription billing across all user types and tier levels.

## Consequences

- One Stripe subscription per active user type per user (2–3 subscriptions for multi-type users).
- Subscription status synced to Supabase via webhooks.
- Stripe Coupons handle the 25% multi-type discount (applied at checkout session creation, not hardcoded).
- Paddle rejected (less flexible for multiple user types); Lemon Squeezy rejected (less mature).
