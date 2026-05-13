# DEC-015: Never hardcode a model name or provider anywhere in the codebase

- **Status:** Accepted
- **Date:** 2026-04-01
- **Related:** DEC-009, DEC-010, DEC-011

## Context

Hardcoded model names create tech debt the moment a better model ships. Every literal like `claude-sonnet-4-6` or `anthropic` in application code is a debt item waiting to accumulate.

## Decision

No model name, provider name, temperature, or `max_tokens` may appear as a literal string or constant anywhere in the codebase — ever. All model configuration is loaded at runtime from the `models` Supabase table. This applies from day one, not retrofitted later.

**In practice:**

- `provider.ts` reads `models` on every request — never references a model string directly.
- Adding a new AI feature = adding a row to `models`, not touching code.
- Changing a model = flipping `is_active` flags in the DB, not a pull request.
- Any PR introducing a hardcoded model string should be rejected in review.

## Consequences

- Config changes propagate within 60 seconds (cache TTL) — no deploy, no risk.
- Every Langfuse trace is attributable to an exact config version.
- Environment variables rejected (no per-feature granularity, requires redeploy); LaunchDarkly rejected (overkill, adds cost).
