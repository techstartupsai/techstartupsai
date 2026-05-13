# DEC-017: Contact page email routing — Google Groups aliases

- **Status:** Accepted
- **Date:** 2026-04-02

## Context

The contact page needs `press@techstartups.ai` and `support@techstartups.ai` addresses. Creating full Workspace user accounts for these costs $7–14/month per address with no operational benefit at current team size.

## Decision

`press@` and `support@` are Google Groups routing aliases forwarding to `evan@techstartups.ai`. No additional Workspace user accounts. Gmail filters (`to:press@` → label "Press", `to:support@` → label "Support") provide inbox routing.

**Contact page design:** Three stacked full-width cards (General → `hello@`, Press → `press@`, Support → `support@`) with mailto links and pre-filled subjects. No form/modal yet — deferred until Resend is wired up.

## Consequences

- Zero extra cost under the existing Workspace plan.
- When Resend is configured, replace mailto cards with a modal contact form (build both in the same story).
- Separate Workspace accounts per address rejected (unnecessary cost).
- Single `hello@` for all categories rejected (loses inbox routing clarity).
