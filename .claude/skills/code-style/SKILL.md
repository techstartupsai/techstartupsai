---
name: code-style
description: Variable naming and control flow style for the techstartups.ai monorepo. Use when writing or reviewing any TypeScript or JavaScript code. Covers abbreviation rules, boolean prefix conventions, brace style for control flow, and comment style.
---

### No abbreviations in variable names

Write the full word, always.

```typescript
// wrong
const res = await fetch(...)
const req = request
const err = error
if (e) { ... }

// right
const response = await fetch(...)
const request = ...
const error = ...
if (event) { ... }
```

Exceptions that are clearer than the spelled-out version: `url`, `id`, `api`, `html`, `css`, `sdk`.
Other common substitutions:

- `btn` → `button`
- `val` → `value`
- `cb` → `callback`
- `tmp` / `temp` → a descriptive name for what it actually holds

### Boolean prefix

Boolean variables and props must be prefixed with `is`, `has`, `can`, `should`, or `will`. Examples: `isPopular`, `isLoading`, `hasError`, `canSubmit`, `shouldRetry`, `willExpire`.

### Always use curly braces on control flow

Always use curly braces for `if` / `else` blocks — even single-line ones. Same rule for `for`, `while`, and `else`.

```typescript
// never
if (response.ok) setSubmitted(true)

// always
if (response.ok) {
  setSubmitted(true)
}
```

### Comment style

- Place the comment above the block it describes. Never inline at the end of a line.
- One comment per logical group of lines; no blank line between comment and code.
- Keep comments short and lowercase.
- JSX section comments use `{/* section name */}`.

```typescript
// parse the request body
const body: unknown = await request.json()
const result = schema.safeParse(body)

// handle errors
if (!result.success) {
  return Response.json({ error: 'Invalid input' }, { status: 400 })
}
```
