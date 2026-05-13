# DEC-018: Footer layout — two-row with social links in row 2

- **Status:** Accepted
- **Date:** 2026-04-02

## Context

Social links are a standard discovery pattern for the footer. The contact page would otherwise need a social section, creating duplication.

## Decision

Site footer is two rows. Row 1: logo + nav links (Privacy · Terms · Blog · Contact) + copyright. Row 2: "Follow us" label + social pill links (X, LinkedIn, Instagram, Substack, Product Hunt, Wellfound, Bluesky, Reddit, Threads, TikTok). YouTube omitted until a channel exists. Flexbox with `flex-wrap` handles mobile — no extra breakpoint logic needed.

## Consequences

- Social section on the contact page can be removed or kept as a secondary reference.
- No new breakpoint logic required; `flex-wrap` is sufficient for the platforms listed.
