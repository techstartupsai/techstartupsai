import { AnchorLink } from '@/components/AnchorLink'

/**
 * Shown when an unsubscribe link is malformed or expired.
 */
export default function InvalidUnsubscribePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">{'Invalid unsubscribe link.'}</h1>
      <p className="text-sm leading-relaxed">
        {'Please contact '}
        <AnchorLink
          href="mailto:hello@techstartups.ai"
          className="text-primary underline-offset-4 hover:underline"
        >
          {'hello@techstartups.ai'}
        </AnchorLink>
        {' if you need help.'}
      </p>
    </div>
  )
}
