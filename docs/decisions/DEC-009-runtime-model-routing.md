# DEC-009: Runtime model routing via Supabase tables

- **Status:** Accepted
- **Date:** 2026-03-31
- **Related:** DEC-010, DEC-015

## Context

Different AI features warrant different models (cost vs capability). We want to swap models per feature without a deploy, and run shadow tests before promoting a new model to production.

## Decision

Model selection for every AI feature is driven by two Supabase tables (`models`, `model_experiments`) read at runtime. No model names are hardcoded anywhere.

## Consequences

- Swapping a model for any feature = one DB row update, no code change, no deploy.
- `model_experiments` enables routing a configurable percentage of traffic to a candidate model, with Langfuse side-by-side comparison before promotion.
- `config.ts` caches the active config in memory with a 60-second TTL to avoid a DB round-trip on every AI request.
- Hardcoded model names in code rejected (requires deploy); environment variables rejected (no per-feature granularity, no experiment support).
