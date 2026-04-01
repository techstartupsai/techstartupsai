export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <nav className="flex items-center gap-4">
          <a href="/privacy" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="/terms" className="transition-colors hover:text-foreground">Terms</a>
          <a href="/blog" className="transition-colors hover:text-foreground">Blog</a>
          <a href="/contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <p>© 2026 TechStartups AI</p>
      </div>
    </footer>
  )
}
