---
name: jsx-conventions
description: JSX text and layout conventions for the techstartups.ai monorepo. Use when writing or editing JSX that contains apostrophes, quotes, or multi-line headings. Covers HTML entity avoidance and Tailwind-idiomatic line breaks.
---

### Apostrophes and quotes — never HTML entities

Never use HTML entities (`&apos;`, `&quot;`, `&amp;`) in JSX text content. They are valid but ugly in source and hard to read at a glance. Always wrap the string in a JS expression instead.

```typescript
// preferred
{"We're working on our first posts."}
{"It's a great day to build."}

// never
We&apos;re working on our first posts.
```

Applies to all JSX text nodes — paragraph copy, headings, labels, placeholders.

### Line breaks in headings

Three ways to break a headline across two lines. Use `block` on the span.

```typescript
// wrong — {" "} is a space, not a line break
<h1>Startup Intelligence,{" "}
  <span className="text-muted-foreground">before it's obvious.</span>
</h1>

// right — block on the span, Tailwind-idiomatic
<h1>Startup Intelligence,
  <span className="block text-muted-foreground">before it's obvious.</span>
</h1>

// works but blunt
<h1>Startup Intelligence,
  <br />
  <span className="text-muted-foreground">before it's obvious.</span>
</h1>
```

`block` is responsive, Tailwind-native, and removes the need for `{" "}` entirely.
