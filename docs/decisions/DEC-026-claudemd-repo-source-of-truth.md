# DEC-026: CLAUDE.md source of truth — repo, not Notion

- **Status:** Accepted
- **Date:** 2026-05-04

## Context

Maintaining `CLAUDE.md` in two places (Notion + repo) created drift risk and required a manual sync step at the start of every Claude Code session. Notion auth occasionally expired mid-session, compounding the friction.

## Decision

The repo's `/CLAUDE.md` at the monorepo root is the single source of truth for Claude Code session context and coding conventions. The Notion mirror has been tombstoned (ID `33562400-378d-81bc-9be6-df7f46e2c54b`) and archived. Edits happen in the repo via PR — no Notion sync.

**What stays in Notion:** Sprint/Tasks, Roadmap, Decision Log, product/business decisions, architecture overview, mockups.

**What lives in the repo:** `CLAUDE.md`, `AGENTS.md`, and the `/docs/` folder (ADRs, conventions, architecture notes, data model docs).

## Consequences

- `CLAUDE.md` ships in PRs alongside related changes and is version-controlled.
- Claude Code reads it natively without a Notion auth round-trip.
- Technical decisions in this Decision Log may eventually graduate to repo ADRs. Product/business DECs stay in Notion.
- Dual-sourcing with manual sync rejected (drift risk, friction).
