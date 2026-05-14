---
name: jsx-conventions
description: JSX text, layout, and event handler naming conventions for the techstartups.ai monorepo. Use when writing or editing JSX — covers apostrophes, quotes, multi-line headings, and handle/on naming.
---

### Event handler naming

Local callback functions use the `handle` prefix. Props that receive a callback use the `on` prefix. Never mix them.

```typescript
// local handler function — always handle prefix
function handleJoinWaitlist() { ... }
function handleClickUserType(userType: UserType) { ... }

// prop that accepts a callback — always on prefix
interface CardProps {
  onSelect: (id: string) => void
  onDismiss: () => void
}

// never use on prefix for a local function
function onSubmit() { ... }  // wrong

// never use handle prefix for a prop
interface CardProps {
  handleSelect: () => void  // wrong
}
```

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
