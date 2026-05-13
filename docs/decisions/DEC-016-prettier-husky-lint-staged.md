# DEC-016: Prettier + Husky + lint-staged for formatting

- **Status:** Accepted
- **Date:** 2026-04-02
- **Related:** DEC-021

## Context

A monorepo spanning TypeScript, JSX, CSS, JSON, and MDX files needs consistent formatting enforced automatically, without per-package config duplication.

## Decision

Single `.prettierrc` at the monorepo root with `prettier-plugin-tailwindcss`. Husky v9 pre-commit hook runs lint-staged, which formats only staged files.

**Config:** `semi: false`, `singleQuote: true`, `trailingComma: 'es5'`, `printWidth: 100`. `tailwindStylesheet` points to `apps/web/app/globals.css` (required for Tailwind v4 — no `tailwind.config.ts`).

**Root `package.json` scripts:** `format` (write all), `format:check` (CI), `prepare` (install hooks on `pnpm install`).

## Consequences

- Pre-commit hook is fast (formats staged files only) — Prettier runs in milliseconds.
- `prettier-plugin-tailwindcss` sorts Tailwind classes automatically.
- Per-package Prettier configs rejected (more overhead, no benefit at this scale).
- Biome rejected (not yet mature enough for a monorepo with mixed TS/CSS/MDX).
