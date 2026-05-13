# DEC-002: Next.js 14 App Router for frontend

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

The web app needs SEO for marketing and blog pages, good performance for the app shell, and server-side data fetching. A separate Node API server for CRUD would add deployment overhead.

## Decision

Use Next.js 14 with App Router for `apps/web`. All routes live under `app/` — no `pages/` directory.

## Consequences

- SSR for public routes (marketing, blog) gives full SEO credit.
- React Server Components reduce client bundle size.
- API routes handle auth, CRUD, and Stripe webhooks — no separate server needed initially.
- React + Vite rejected (no SSR); Remix rejected (smaller ecosystem).
