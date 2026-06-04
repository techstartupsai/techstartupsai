// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // sample 100% of traces in dev/preview; 10% in production to keep quota usage reasonable
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  enableLogs: true,

  // do not attach IP, headers, or other PII by default — set per-event via Sentry.setUser
  sendDefaultPii: false,
})
