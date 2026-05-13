# DEC-004: Supabase for auth + database

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

The app needs authentication (email + Google OAuth), a relational database, and per-user data isolation. Using separate services for auth and DB doubles the integration surface area.

## Decision

Use Supabase (Postgres) for both authentication and the primary database.

## Consequences

- Row-level security (RLS) enforces per-user data isolation at the DB layer — the application layer cannot accidentally bypass it.
- Supabase Auth handles email + Google OAuth out of the box.
- Auto-generated TypeScript types via `packages/db` keep queries type-safe.
- Auth0 + PlanetScale rejected (two services); Firebase rejected (NoSQL, poor fit for relational startup data).
