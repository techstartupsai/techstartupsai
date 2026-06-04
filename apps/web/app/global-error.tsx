'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Top-level error boundary rendered when a fatal error occurs outside any route segment.
 * Cannot use the root layout — must render its own <html>/<body>.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Something went wrong</p>
          <h1 className="text-3xl font-bold tracking-tight">We hit an unexpected error.</h1>
          <p className="text-sm text-muted-foreground">
            {'The team has been notified. Try again, or head back to the homepage.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
