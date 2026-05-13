# DEC-003: Python sidecar for AI service data work

- **Status:** Accepted
- **Date:** 2026-03-31

## Context

Momentum scoring requires weighted signal aggregation across multiple data sources — hiring velocity, funding recency, web traffic trends. This is data science work that benefits from pandas/numpy/scikit-learn. PDF pitch deck scoring requires converting pages to images before vision-model scoring.

## Decision

`apps/ai-service` is primarily TypeScript (Express/Fastify). A Python sidecar handles two specific jobs only: `pdf_converter.py` (PDF → images) and `momentum_math.py` (weighted signal aggregation). TypeScript routers call Python scripts as subprocesses, pass JSON in, get JSON back. Python never touches the LLM.

## Consequences

- LLM calls stay in TypeScript with Langfuse tracing — no observability gap.
- Python used only where its ecosystem provides a clear win; the rest is TypeScript.
- Adds subprocess IPC overhead, but these are batch/async jobs where latency is not critical.
- Original DEC described a FastAPI microservice; the actual implementation settled on a TypeScript service with a Python sidecar — the architecture page reflects the current shape.
