# DEC-001: Monorepo with Turborepo + pnpm workspaces

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

The project needs to share code across a Next.js web app, a TypeScript/Python AI service, a UI component library, and a database client package. Keeping these in separate repos adds overhead for a small team (cross-repo PRs, separate CI pipelines, version bumping).

## Decision

Use Turborepo to orchestrate a pnpm monorepo with `apps/` and `packages/` structure.

## Consequences

- Build caching and task orchestration with minimal config.
- Atomic commits across packages — a UI change and the app consuming it land in one PR.
- Shared TypeScript types without publishing packages.
- Nx considered and rejected as over-complex for current team size.
