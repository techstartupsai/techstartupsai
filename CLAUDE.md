@AGENTS.md

# TechStartups AI — Claude Code context

techstartups.ai monorepo — startup intelligence platform for job seekers, founders, and investors.

**Human-facing reference:** [Claude Code Playbook](https://www.notion.so/33562400378d81918025e648e4919663)

## Skills

`.claude/skills/` holds auto-applied coding patterns. Consult the relevant skill when the task matches its description.

| Slug              | When to apply                                                                    |
| ----------------- | -------------------------------------------------------------------------------- |
| `design-system`   | Importing UI components, writing components with `className`, adding shadcn      |
| `jsx-conventions` | Writing any JSX — apostrophes, quotes, multi-line headings, event handler naming |
| `code-style`      | Writing or reviewing any TypeScript / JavaScript                                 |
| `git-discipline`  | Any time changes are ready to commit                                             |

## Architectural decisions

`/docs/decisions/` will hold ADRs mirrored from the Notion Decision Log. _(Folder not yet created — separate task.)_

## Monorepo structure

```
techstartupsai/
├── apps/
│   ├── web/              ← Next.js 14 App Router (frontend + API routes)
│   ├── cron/             ← TypeScript Bun scripts (@techstartups/cron): blog-sync, future scheduled jobs
│   └── ai-service/       ← AI inference jobs (TypeScript + Python sidecar)
├── emails/               ← React Email templates (@techstartups/emails), shared across apps
├── packages/
│   ├── ui/               ← shadcn/ui components (@techstartups/ui)
│   ├── db/               ← Supabase client + generated types (@techstartups/db)
│   └── config/           ← shared eslint, tsconfig, tailwind
├── CLAUDE.md             ← you are here
├── AGENTS.md
└── turbo.json
```

## Tech stack

- **Next.js 14 App Router** — no `pages/` directory, ever. All routes in `app/`.
- **shadcn/ui + Tailwind CSS v4** — dark mode via `@custom-variant dark (&:is(.dark *))` in globals.css (no tailwind.config.ts)
- **next-themes** — dark/light toggle, system preference + localStorage
- **Supabase** — PostgreSQL, auth (email + Google OAuth), RLS
- **Stripe** — subscriptions, one per user type per user
- **Turborepo + Bun workspaces** — build caching, shared packages
- **Vercel** — apps/web deployment
- **Railway** — apps/ai-service deployment
- **Langfuse** — AI observability (traces, cost, evals)
- **Anthropic Claude** — primary AI provider, direct SDK (no LangChain)

## Route conventions

- Route files are always named `page.tsx`. Never use custom names like `HomePage.tsx` as route files.
- `app/(public)/` — public-facing pages (landing, pricing, blog, startup profiles)
- `app/(app)/` — authenticated pages (dashboards, onboarding, settings)
- Components go in `apps/web/components/` or `packages/ui/components/`

## Current routes

| URL                   | File                                    | Component               | Status      |
| --------------------- | --------------------------------------- | ----------------------- | ----------- |
| `/`                   | `app/(public)/page.tsx`                 | `HomePage`              | Built       |
| `/pricing`            | `app/(public)/pricing/page.tsx`         | `PricingPage`           | In progress |
| `/blog`               | `app/(public)/blog/page.tsx`            | `BlogPage`              | Pending     |
| `/blog/[slug]`        | `app/(public)/blog/[slug]/page.tsx`     | `BlogPostPage`          | Pending     |
| `/startups/[id]`      | `app/(public)/startups/[id]/page.tsx`   | `StartupProfilePage`    | Pending     |
| `/onboarding`         | `app/(app)/onboarding/page.tsx`         | `OnboardingPage`        | Pending     |
| `/dashboard`          | `app/(app)/dashboard/page.tsx`          | `DashboardPage`         | Pending     |
| `/dashboard/founder`  | `app/(app)/dashboard/founder/page.tsx`  | `FounderDashboardPage`  | Pending     |
| `/dashboard/investor` | `app/(app)/dashboard/investor/page.tsx` | `InvestorDashboardPage` | Pending     |
| `/settings`           | `app/(app)/settings/page.tsx`           | `SettingsPage`          | Pending     |

## Coding conventions

- **Tailwind only** — no inline styles, no CSS modules, no hardcoded hex values
- All colours must work in **light AND dark mode** via Tailwind semantic classes
- **TypeScript strict mode** throughout — no `any`, no `as` casts without justification
- See skill files for `cn()` usage, naming, brace style, comment style, JSX text rules, and event handler naming

## Test conventions

- Each `*.test.ts` file is self-contained and readable in isolation. Prefer slight duplication over clever abstraction.
- Global setup (env vars, `vi.clearAllMocks()`) lives in `apps/web/test/setup.ts`, wired in via `vitest.config.mts` `setupFiles`.
- Mocks for the route under test live in the test file itself, not extracted into shared helpers.
- Route-specific `beforeEach` defaults stay in the test file — what counts as the happy path varies per route.
- **Rule of three:** don't extract a test helper until the same pattern appears in 3+ files.
- **Colocated test files:** `route.test.ts` next to `route.ts` (or `route.tsx`). No `__tests__/` directories.
- **Mocking:** use `vi.mock()` at the import boundary, scoped per test file. No shared global mock state — tests must be isolated.
- **Environment:** API route tests use Vitest with `environment: 'node'` (not jsdom).
- **Runner:** `bun run test` at root runs all tests via Turborepo.

## Blog content pipeline (`apps/cron`)

`apps/cron` is a first-class Bun TypeScript workspace for offline scripts and scheduled jobs. It is not served — it runs from the CLI or a cron job.

### blog:sync workflow

Run from the repo root:

```bash
bun run blog:sync              # incremental — only posts whose content_hash changed
bun run blog:sync --file slug  # single post by filename (no .mdx extension)
bun run blog:sync --all        # force re-embed everything
```

The script (`apps/cron/src/scripts/blog-sync.ts`):

1. Reads all `apps/web/content/blog/<category>/*.mdx` files
2. Parses frontmatter with `gray-matter`, validates with Zod
3. Strips MDX → plain text via `unified` + `remark-parse` + `remark-mdx` + a custom AST walker (skips import/JSX/expression nodes)
4. Computes `content_hash = sha256(canonical frontmatter JSON + raw body)` — skips unchanged posts
5. Generates embedding via `apps/cron/src/lib/embeddings.ts` (OpenAI `text-embedding-3-small`, 1536d)
6. Upserts into `blog_posts` (Supabase), preserving `created_at`
7. On success, calls `POST /api/revalidate` to trigger ISR for `/blog`

Embedding logic is isolated in `apps/cron/src/lib/embeddings.ts`. OpenAI is hardcoded for embeddings (diverges from runtime-config principle for chat models — see DEC-030). A future provider swap is a one-file edit + `bun run blog:sync --all`.

### apps/cron conventions

- Entry points live in `apps/cron/src/scripts/`
- Shared helpers live in `apps/cron/src/lib/`
- Env loaded via `dotenv -e .env.local` in the `blog:sync` script
- Uses `@techstartups/db/server` (`createServiceRoleClient`) — never import `@supabase/supabase-js` directly in apps/cron
- `SUPABASE_SECRET_KEY` is the service role key (not `SUPABASE_SERVICE_ROLE_KEY`)
- `OPENAI_API_KEY` required for embedding generation
- `REVALIDATE_SECRET` required for ISR cache busting

## AI conventions

- No LangChain — direct SDK calls to Anthropic only
- Prompts live in Supabase `prompts` table, not in code
- Models live in Supabase `models` table, not hardcoded
- **Never hardcode a model name, provider, temperature, or max_tokens anywhere in the codebase — ever.** Everything loads from `models` at runtime. See DEC-015.
- Exception: `apps/cron/src/lib/embeddings.ts` hardcodes `text-embedding-3-small` — embeddings are corpus-level, not request-level. See DEC-030.

## Key database tables

- `profiles` — user identity, `primary_user_type`, `trial_used`
- `user_subscriptions` — one row per user per type (replaces single user_type field); includes `trial_ends_at`
- `startups` — startup profiles
- `momentum_scores` — computed per startup per date
- `usage_limits` — keyed by user_id + user_type + feature
- `models` — runtime model routing per feature (was `model_configs`)
- `prompts` — versioned prompt templates per feature (was `prompt_configs`)

## Notion — source of truth

Always read the relevant Notion page before building a feature:

- Architecture: https://www.notion.so/33562400378d803e936fd6866881b3e8
- File & Route Structure: https://www.notion.so/33562400378d81f68254ea465d579884
- Product Specs (tiers + features): https://www.notion.so/33562400378d80ec929cc644350e344f
- Decision Log: https://www.notion.so/33562400378d805e9315f03fea059619
- Design & Mockups: https://www.notion.so/33562400378d81e39209f9ca595d2617
- Global Layout spec: https://www.notion.so/33562400378d81378413c71c4605bb33
- Landing Page spec + source: https://www.notion.so/33562400378d81ef91f5e13bf51c06e0
- Pricing Page spec + source: https://www.notion.so/33562400378d818f84a7ec4682869a43

## Rules for every session

1. Read the relevant Notion page(s) before writing any code
2. Check the Decision Log for decisions affecting what you're building
3. Follow File & Route Structure conventions exactly
4. Stop after each logical unit and wait for review before continuing
5. One commit per logical unit — never bundle unrelated changes
6. Each commit must be independently deployable to Vercel
7. Never commit or push — see `git-discipline` skill
