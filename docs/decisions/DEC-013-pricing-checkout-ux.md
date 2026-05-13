# DEC-013: Pricing checkout UX — live savings display + billing toggle

- **Status:** Accepted
- **Date:** 2026-04-01
- **Related:** DEC-012, DEC-014

## Context

The product has compounding discounts (multi-type 25% + annual 20%). Discounts only drive conversions if users can see them in real time as they configure their plan.

## Decision

The pricing selector and onboarding plan-builder display a live running total with per-line savings. A monthly/annual toggle updates all prices instantly. All math runs client-side — no round trips.

**Discount math:**

- Multi-type: 2nd+ type = 25% off that type's price
- Annual: 20% off (multiplicative on top of multi-type)
- 2nd type on annual = `price × 0.75 × 0.80` = effectively 40% off full monthly annualized

## Consequences

- Each line item shows full price (struck through), discounted price, and per-item saving.
- Sticky running total card shows subtotal, savings badge, and final charge.
- Annual view shows both monthly equivalent rate and actual annual charge.
- Stripe coupon for multi-type discount generated server-side at checkout — not hardcoded.
- Showing savings only at the final checkout summary rejected (too late, low conversion impact).
