# DEC-011: Prompts live in Supabase, not in code

- **Status:** Accepted
- **Date:** 2026-03-31
- **Related:** DEC-009, DEC-015

## Context

Prompts need to iterate faster than code. Fixing a hallucination or tuning output format should not require a deploy. Every Langfuse trace should be attributable to the exact prompt version that produced it.

## Decision

All prompt text (system prompts, user templates) lives in a `prompts` Supabase table, loaded at runtime. No prompt strings are hardcoded anywhere in the codebase. Template variables (`{{startup_name}}`) allow dynamic prompts without code changes.

## Consequences

- Prompt changes without deploys — update a row, live within 60 seconds (cache TTL).
- Versioned rows give a full audit trail; Langfuse traces record exact prompt version per call.
- Prompts in code as constants rejected (requires deploy, no audit trail).
- Prompts in environment variables rejected (no versioning, no per-feature granularity).
