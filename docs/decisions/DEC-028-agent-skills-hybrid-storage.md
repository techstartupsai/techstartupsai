# DEC-028: Agent Skills — hybrid filesystem + Supabase storage

- **Status:** Accepted (deferred until 2nd–3rd production agent lands)
- **Date:** 2026-05-12
- **Related:** DEC-011, DEC-015, DEC-020, DEC-029

## Context

As agents grow, monolithic system prompts become expensive and hard to iterate on. Anthropic's SKILL.md pattern (progressive disclosure) solves this, but a pure-filesystem implementation contradicts DEC-011/DEC-015 — instructions should be runtime-configurable without a deploy.

## Decision

Adopt the SKILL.md pattern but split storage:

- **Filesystem (build-time):** `packages/agents/skills/{slug}/` — TypeScript tool implementations, Zod schemas, and `manifest.ts` exporting `{ slug, codeVersion, tools[] }`. Compiled and deployed atomically.
- **Supabase (runtime):** `skills` and `skill_versions` tables — instructions and descriptions versioned with integer scheme, eval-gated before promotion.

**Self-tools added to the harness:** `skill_search(query)` returns matching descriptions; `skill_load(slug)` returns the full instruction body + tool list.

**Timing trigger:** Pull this work when an agent's inline system prompt grows past ~1.5–2k tokens, or when the same instruction block appears in two agents.

## Consequences

- Breaking tool signature changes: bump `manifest.codeVersion` → ship code → bump `skills.code_min_version`.
- Non-breaking instructions edits skip the code path entirely — pure Supabase update + eval pass.
- `config.ts` caches skills with a ~5 min LRU TTL; invalidates on `active_version` flip.
- Pure filesystem rejected (requires deploy to iterate on instructions); pure Supabase rejected (loses TypeScript type safety on tool inputs/outputs).
