# Decision Log — ADR Index

Mirrored from the [Notion Decision Log](https://www.notion.so/33562400378d805e9315f03fea059619). Notion is the working source of truth; these files are agent-readable copies. When a DEC is added or changes in Notion, update the corresponding file here.

DEC-025 does not exist — the numbering gap is in the original log.

| #                                                       | Title                              | Status              | Summary                                                                                                   |
| ------------------------------------------------------- | ---------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| [DEC-001](./DEC-001-monorepo-turborepo-pnpm.md)         | Monorepo with Turborepo + pnpm     | Accepted            | Turborepo manages a pnpm monorepo for atomic commits and shared types across apps and packages.           |
| [DEC-002](./DEC-002-nextjs-app-router.md)               | Next.js 14 App Router              | Accepted            | App Router for SSR, RSC, and built-in API routes — no separate backend server.                            |
| [DEC-003](./DEC-003-python-ai-service.md)               | Python sidecar for AI service      | Accepted            | TypeScript-first AI service; Python sidecar for momentum math and PDF conversion only.                    |
| [DEC-004](./DEC-004-supabase-auth-database.md)          | Supabase for auth + database       | Accepted            | Single platform for Postgres + auth + RLS; auto-generated TypeScript types.                               |
| [DEC-005](./DEC-005-shadcn-ui-packages.md)              | shadcn/ui in packages/ui           | Accepted            | Copy-owned component library in packages/ui, shared across apps.                                          |
| [DEC-006](./DEC-006-stripe-payments.md)                 | Stripe for subscription billing    | Accepted            | One Stripe subscription per user type; 25% multi-type discount via Stripe coupon.                         |
| [DEC-007](./DEC-007-mdx-blog-no-cms.md)                 | MDX blog, no CMS                   | Accepted            | Blog posts as MDX in apps/web — no CMS cost, version-controlled, SEO-optimized.                           |
| [DEC-008](./DEC-008-vercel-railway-deployment.md)       | Vercel + Railway deployment        | Accepted            | apps/web on Vercel; apps/ai-service on Railway for Python + Node support.                                 |
| [DEC-009](./DEC-009-runtime-model-routing.md)           | Runtime model routing via Supabase | Accepted            | Model selection per feature from `models` table; no hardcoded model names.                                |
| [DEC-010](./DEC-010-multi-provider-support.md)          | Multi-provider AI support          | Accepted            | provider.ts SDK factory routes Anthropic, OpenAI, and future providers without code changes.              |
| [DEC-011](./DEC-011-prompts-in-supabase.md)             | Prompts live in Supabase           | Accepted            | All prompt text in `prompts` table, runtime-loaded, versioned with full audit trail.                      |
| [DEC-012](./DEC-012-multi-type-subscriptions.md)        | Multi-type user subscriptions      | Accepted            | Users subscribe to any combination of user types; feature access is union of all active subs.             |
| [DEC-013](./DEC-013-pricing-checkout-ux.md)             | Pricing checkout UX                | Accepted            | Live savings display and billing toggle — all discount math runs client-side.                             |
| [DEC-014](./DEC-014-free-trial.md)                      | 14-day free trial                  | Accepted            | Card required upfront; auto-converts at day 14; one trial per user lifetime.                              |
| [DEC-015](./DEC-015-no-hardcoded-model-names.md)        | No hardcoded model names           | Accepted            | Model names, providers, and params must never appear as literals anywhere in the codebase.                |
| [DEC-016](./DEC-016-prettier-husky-lint-staged.md)      | Prettier + Husky + lint-staged     | Accepted            | Single root Prettier config with Tailwind plugin; pre-commit formats staged files only.                   |
| [DEC-017](./DEC-017-contact-email-routing.md)           | Contact email routing              | Accepted            | press@ and support@ are Google Groups aliases — no extra Workspace accounts.                              |
| [DEC-018](./DEC-018-footer-layout.md)                   | Footer layout                      | Accepted            | Two-row footer: nav + copyright in row 1; social links in row 2.                                          |
| [DEC-019](./DEC-019-i18n-deferred.md)                   | i18n deferred                      | Accepted            | No i18n until non-English traffic signal; next-intl is the library of choice when needed.                 |
| [DEC-020](./DEC-020-ai-eval-strategy.md)                | AI eval strategy                   | Accepted            | Three layers: Vitest for invariants, Langfuse for quality evals, manual gate before model/prompt changes. |
| [DEC-021](./DEC-021-testing-strategy.md)                | Testing strategy                   | Accepted            | Vitest + GitHub Actions CI; Playwright deferred; no tests in pre-commit or Vercel build.                  |
| [DEC-022](./DEC-022-blog-related-posts-revalidation.md) | Blog related posts revalidation    | Accepted            | On-demand revalidation only — fires at end of blog:sync, never on a timer.                                |
| [DEC-023](./DEC-023-cloudflare-dns-deferred.md)         | Cloudflare DNS + rate limiting     | Accepted            | Deferred DNS migration; Cloudflare as future WAF and rate limiting layer in front of Vercel.              |
| [DEC-024](./DEC-024-cloudflare-turnstile.md)            | Cloudflare Turnstile               | Accepted            | Invisible CAPTCHA on waitlist form; no double opt-in; verified server-side before processing.             |
| [DEC-026](./DEC-026-claudemd-repo-source-of-truth.md)   | CLAUDE.md repo source of truth     | Accepted            | Repo /CLAUDE.md is canonical; Notion mirror tombstoned; edits via PR.                                     |
| [DEC-027](./DEC-027-mcp-native-distribution.md)         | MCP-native distribution            | Accepted            | TechStartups.ai as an MCP server (second surface) — post-launch, after core platform ships.               |
| [DEC-028](./DEC-028-agent-skills-hybrid-storage.md)     | Agent Skills hybrid storage        | Accepted (deferred) | Filesystem for tool code; Supabase for runtime instructions. Pull when 2nd–3rd agent lands.               |
| [DEC-029](./DEC-029-skill-evals-langfuse.md)            | Skill evals via Langfuse           | Accepted            | Skill version eval gate runs on existing Langfuse harness — no new platform.                              |
