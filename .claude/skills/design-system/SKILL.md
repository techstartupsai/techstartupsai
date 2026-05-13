---
name: design-system
description: Conventions for the @techstartups/ui design system. Use when importing UI components, writing components that accept a className prop, or when shadcn components need to be added to the monorepo. Covers cn() helper usage, PascalCase imports, and where shadcn components belong.
---

### Two imports cover almost everything

```typescript
import { Button } from '@techstartups/ui' // components — always PascalCase
import { cn } from '@techstartups/ui' // class merging utility
```

### cn() — required for every component that accepts className

`cn` combines `clsx` (conditional classes) + `tailwind-merge` (conflict resolution). Without it, conflicting Tailwind classes produce unpredictable results. With it, the last class wins cleanly.

```typescript
// conditional classes
<div className={cn("px-4 py-2", isActive && "bg-blue-500", className)} />

// overridable component defaults — the right way to build every component
function Card({ className, ...props }) {
  return <div className={cn("rounded-lg border p-4", className)} {...props} />
}
```

**Rule:** use `cn` in every component that accepts a `className` prop. Never concatenate class strings with template literals or `+`.
Source: `packages/ui/lib/utils.ts`, exported from `packages/ui/index.ts`.

### Imports are always PascalCase

```typescript
import { Button } from '@techstartups/ui' // correct
import { button } from '@techstartups/ui' // wrong
```

### Adding shadcn components

shadcn components must land in `packages/ui/components/`, not `apps/web/components/ui/`. If `shadcn init` is run from inside `apps/web`, it drops components in the wrong place.

Working setup:

- `packages/ui/package.json` → `"name": "@techstartups/ui"`
- `packages/ui/index.ts` → exports all components
- `apps/web/package.json` → `"@techstartups/ui": "workspace:*"` in dependencies
- After adding the dependency: run `pnpm install` from the repo root

If components landed in the wrong place, move them to `packages/ui/components/` and update the imports.
