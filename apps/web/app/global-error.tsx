'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

/*
 * Top-level error boundary rendered when a fatal error occurs outside any route segment.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        {/* app router doesn't expose status codes — pass 0 to render the generic error message */}
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
