import Link from 'next/link'

interface AnchorLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  noFollow?: boolean
}

/**
 * Renders a Next.js Link for internal routes or a plain <a> for external URLs and mailto/tel.
 * All native anchor attributes are forwarded and override defaults.
 */
export function AnchorLink({ href, children, noFollow = false, ...props }: AnchorLinkProps) {
  // internal paths use Next.js Link for client-side navigation
  const isInternal = href.startsWith('/') || href.startsWith('#')
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  // mailto and tel links open in the system default handler — no target or rel needed
  const isSchemeLink = href.startsWith('mailto:') || href.startsWith('tel:')
  if (isSchemeLink) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  // external links open in a new tab with appropriate rel attributes; consumer can override
  const rel = ['noopener', 'noreferrer', ...(noFollow ? ['nofollow'] : [])].join(' ')
  return (
    <a href={href} target="_blank" rel={rel} {...props}>
      {children}
    </a>
  )
}
