# DEC-029: Skill evals run through the existing Langfuse harness

- **Status:** Accepted
- **Date:** 2026-05-12
- **Related:** DEC-020, DEC-028

## Context

DEC-028 introduces `skill_versions` rows with a `draft → eval → active` promotion gate. A new eval platform (Braintrust) was re-evaluated specifically for skills as a distinct artifact type.

## Decision

The eval gate for `skill_versions` runs on the same Langfuse harness already used for prompts and models (DEC-020). Braintrust rejected — splitting the eval surface across two platforms would mean two dashboards, two dataset curation workflows, and two attribution stories for every regression.

**Experiment naming:** `skill:{slug}:v{version}` — gives direct side-by-side comparison in Langfuse.

**`eval_runs` table change:** Add a nullable `skill_version_id` FK alongside existing `prompt_version_id` and `model_id` FKs. Exactly one of the three artifact FKs is non-null per row.

## Consequences

- Same LLM-as-judge scorers from DEC-020 apply. Skill-specific datasets are curated per slug; where a skill and a model touch the same capability, the dataset is shared and the experiment tag distinguishes which artifact varied.
- Manual review of experiment diff → flip `active_version` pointer in `skills` table → status becomes `active`.
- Braintrust rejected for the same operational overhead reasons as in DEC-020, re-evaluated independently for skills.
- No new tooling, no new tables beyond the `skill_version_id` FK addition.
