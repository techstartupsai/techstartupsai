# DEC-007: MDX for blog, no CMS

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

The blog is needed for SEO and content marketing. At current team size, a CMS adds cost and complexity without a clear operational benefit.

## Decision

Blog posts are MDX files inside `apps/web`, rendered via Next.js + `next-mdx-remote` or Contentlayer.

## Consequences

- Fast to build; no CMS cost.
- Posts are version-controlled alongside the code.
- Static pages are fully SEO-optimized.
- Can migrate to a CMS (Sanity, Contentful) later if a content team grows — the move is mechanical.
- Sanity and Contentful rejected as premature cost and complexity.
