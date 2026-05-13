# DEC-020: AI eval strategy — Langfuse + Vitest + LLM-as-judge

- **Status:** Accepted
- **Date:** 2026-04-08
- **Related:** DEC-009, DEC-011, DEC-015, DEC-029

## Context

AI output is non-deterministic — traditional pass/fail unit tests cannot answer "are these results good?" Quality needs to be measured at both the correctness layer (schema, invariants) and the output quality layer (does this make sense?).

## Decision

Three-layer eval strategy:

1. **Vitest** — unit tests for pure functions + Zod schema invariant tests. Fast, cheap, run in CI on every commit.
2. **Langfuse eval suite** — dataset of golden examples scored by Claude against defined criteria (LLM-as-judge). Slow and expensive — runs on a schedule, not in CI. Datasets live in Langfuse, not in code.
3. **Manual eval gate** — required before any model swap or system prompt change is promoted to production.

**Experiment naming:** `feature-name:model-candidate` — enables side-by-side comparison in Langfuse before promotion.

## Consequences

- Every prompt or model change has a measurable quality signal before users see degradation.
- Weekly cron run catches silent regressions from data drift or upstream model changes.
- Braintrust rejected — redundant given Langfuse is already integrated (see DEC-029 for the skills-specific re-evaluation).
- Custom eval scripts without a framework rejected (no trend tracking, no experiment comparison).
