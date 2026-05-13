# DEC-008: Vercel (web) + Railway (ai-service) for deployment

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

`apps/web` (Next.js) and `apps/ai-service` (TypeScript + Python sidecar) have different runtime requirements and benefit from different hosting platforms.

## Decision

Deploy `apps/web` to Vercel. Deploy `apps/ai-service` to Railway.

## Consequences

- Vercel is the natural home for Next.js — first-class support, edge network, preview deployments.
- Railway handles Python + Node in the same container without friction; simple Dockerfile deploy.
- Both integrate with GitHub for CI/CD.
- AWS rejected (too complex for current stage); Render is viable but Railway is faster to set up.
