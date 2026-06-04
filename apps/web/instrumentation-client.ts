import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'

// initialize sentry with session replay
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: false,
})

// initialize posthog — pageview is captured manually via onRouterTransitionStart
const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const isPosthogInitialized = Boolean(posthogToken)
if (posthogToken) {
  posthog.init(posthogToken, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
  })
}

/*
 * Captures a Sentry router transition and a PostHog pageview on every navigation.
 */
export function onRouterTransitionStart(
  url: string,
  navigationType: 'push' | 'replace' | 'traverse'
) {
  Sentry.captureRouterTransitionStart(url, navigationType)
  if (isPosthogInitialized) {
    posthog.capture('$pageview', {
      $current_url: window.location.origin + url,
    })
  }
}
