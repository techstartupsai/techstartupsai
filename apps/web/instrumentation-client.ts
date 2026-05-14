import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'

// initialize sentry with session replay
Sentry.init({
  dsn: 'https://55944bf2d881307627576480e791e182@o4511141633654784.ingest.us.sentry.io/4511141637455872',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
})

// initialize posthog — pageview is captured manually via onRouterTransitionStart
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  capture_pageview: false,
  capture_pageleave: true,
})

/*
 * Captures a Sentry router transition and a PostHog pageview on every navigation.
 */
export function onRouterTransitionStart(
  url: string,
  navigationType: 'push' | 'replace' | 'traverse'
) {
  Sentry.captureRouterTransitionStart(url, navigationType)
  posthog.capture('$pageview', {
    $current_url: window.location.origin + url,
  })
}
