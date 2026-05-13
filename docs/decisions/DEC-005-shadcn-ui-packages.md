# DEC-005: shadcn/ui in packages/ui

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

The web app needs a consistent design system. Components need to be shareable if additional apps are added to the monorepo later.

## Decision

A shared shadcn/ui component library lives in `packages/ui` (`@techstartups/ui`), consumed by `apps/web`.

## Consequences

- shadcn/ui is copy-owned — all component code lives in the repo, not in a node_modules black box. We can modify any component without forking a library.
- Single place to update and version components across the monorepo.
- Importing shadcn directly into `apps/web` rejected — no sharing, harder to maintain consistency if more apps are added.
