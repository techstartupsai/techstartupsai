# DEC-027: MCP-native distribution — TechStartups.ai as an MCP server

- **Status:** Accepted
- **Date:** 2026-05-11
- **Related:** DEC-012, DEC-015

## Context

Sophisticated angels and founders increasingly live in Claude/Cursor/Cline. Crunchbase, CB Insights, and PitchBook are absent from every major MCP registry as of May 2026. The startup-intelligence category is uncontested.

## Decision

Expose TechStartups.ai core intelligence (Momentum Score, Soonicorn Index, Startup Match, founder graph) via a Model Context Protocol server as a second product surface alongside the web app.

**Sequencing:** Ship core platform first. MCP server lands post-launch in the second wave — roughly 3–6 months after Phase 2 goes live.

**Architectural boundary:**

- Does: expose data via an MCP server for external AI clients to consume.
- Does not: proxy our own backend through MCP. Internal AI flows continue calling Anthropic SDK directly.

**Monetization:** MCP server is a paid feature. API keys tied to Stripe subscription tiers, rate limits scaled per tier. Free tier is web-only. Reuses `user_subscriptions` infrastructure from DEC-012.

## Consequences

- `apps/mcp` is a separate workspace — removing it does not affect `apps/web` or internal AI flows. Low lock-in.
- Every internal API designed now should be MCP-shaped by default (clean tool boundaries, structured JSON) to make the MCP layer a thin adapter rather than a refactor.
- MCP-only rejected (web app is the trust/brand engine); web-only rejected (leaves highest-leverage distribution untapped).
