# DEC-022: Blog related posts — on-demand revalidation only

- **Status:** Accepted
- **Date:** 2026-04-08

## Context

Related blog posts are derived from the `blog_posts` Supabase table via pgvector similarity search. That table only changes when `pnpm blog:sync` runs.

## Decision

Related posts use on-demand revalidation triggered at the end of every `blog:sync` run — no `revalidate = 86400` time-based fallback. `blog:sync` calls `POST /api/revalidate` with a secret token, which calls `revalidatePath('/blog')` to invalidate all blog post pages.

**Env var required:** `REVALIDATE_SECRET` — shared between `blog:sync` and the revalidate route to prevent unauthorized cache busting.

## Consequences

- Pages re-render only when data actually changes — no unnecessary Vercel function invocations.
- Related posts are server-rendered into the HTML before the crawler arrives — full SEO credit.
- Time-based ISR (`revalidate = 86400`) rejected (unnecessary re-renders with no benefit).
- Client-side fetch for related posts rejected (hurts SEO — crawler may not execute JavaScript).
