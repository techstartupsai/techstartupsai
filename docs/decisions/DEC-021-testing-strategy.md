# DEC-021: Testing strategy — Vitest + Playwright + GitHub Actions CI

- **Status:** Accepted
- **Date:** 2026-04-08
- **Related:** DEC-016

## Context

Tests need to run reliably without slowing local development. Pre-commit hooks should stay fast (Prettier + lint only). Vercel builds should compile the app, not run tests.

## Decision

- **Pre-commit (Husky):** Prettier + lint only. No tests here.
- **GitHub Actions CI:** `pnpm typecheck && pnpm test` (Vitest). Runs on every push. Blocks Vercel deploy on failure via branch protection.
- **Vercel build:** `next build` only.
- **Playwright:** Deferred — separate CI job, runs against Vercel preview URL after deploy. Not in the main pipeline until Phase 3+.

**Test file convention:** colocated — `route.test.ts` next to `route.ts`. No `__tests__/` directories.

## Consequences

- Only write tests for code that is permanent and has compliance, billing, or auth implications. No tests for temporary scaffolding.
- Supabase client is mocked in all unit tests — no real DB calls.
- Jest rejected (ESM config pain in a monorepo); Vitest is the modern replacement.
- Pre-commit test runs rejected (too slow, encourages `--no-verify`).
