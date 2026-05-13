# DEC-019: Internationalization (i18n) — deferred

- **Status:** Accepted
- **Date:** 2026-04-07

## Context

TechStartups.ai targets the US startup ecosystem with an English-speaking initial audience. No non-English traffic signal exists yet.

## Decision

No i18n implementation at this stage. Deferred until analytics show meaningful non-English traffic or a specific market opportunity is identified. Library of choice when the time comes: `next-intl` (integrates cleanly with Next.js 14 App Router).

## Consequences

- Write clean React components with no string literals in awkward places, but no special i18n scaffolding now.
- Retrofitting `next-intl` later is mechanical — mainly extracting UI strings into a messages file.
- Translated blog content (locale-aware URLs, MDX per language, translation workflow) is a content operations problem deferred alongside code i18n.
