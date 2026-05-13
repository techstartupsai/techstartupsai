# DEC-010: Multi-provider support in provider.ts

- **Status:** Accepted
- **Date:** 2026-03-31
- **Related:** DEC-009, DEC-015

## Context

Locking AI calls to a single provider creates vendor risk. Different features may perform better or be cheaper on different providers. A/B testing across providers should be possible without restructuring the code.

## Decision

`packages/agents/src/provider.ts` is a SDK factory that routes to Anthropic, OpenAI, or any future provider based on the `provider` column in the `models` Supabase table. All model calls go through this single factory.

## Consequences

- Adding a new provider = adding one case to the factory switch; no change to callers.
- Provider swap is testable via `model_experiments` before going to full traffic.
- Anthropic-only rejected (vendor lock-in); separate service per provider rejected (too much overhead).
