import Link from 'next/link'

interface AnchorLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  title?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  noFollow?: boolean
}

/*
 * Renders a Next.js Link for internal routes or a plain <a> for external URLs and mailto/tel.
 */
export function AnchorLink({
  href,
  children,
  className,
  title,
  onClick,
  noFollow = false,
}: AnchorLinkProps) {
  // internal paths use Next.js Link for client-side navigation
  const isInternal = href.startsWith('/') || href.startsWith('#')
  if (isInternal) {
    return (
      <Link href={href} className={className} title={title} onClick={onClick}>
        {children}
      </Link>
    )
  }

  // mailto and tel links open in the system default handler — no target or rel needed
  const isSchemeLink = href.startsWith('mailto:') || href.startsWith('tel:')
  if (isSchemeLink) {
    return (
      <a href={href} className={className} title={title} onClick={onClick}>
        {children}
      </a>
    )
  }

  // external links open in a new tab with appropriate rel attributes
  const rel = ['noopener', 'noreferrer', ...(noFollow ? ['nofollow'] : [])].join(' ')
  return (
    <a href={href} target="_blank" rel={rel} className={className} title={title} onClick={onClick}>
      {children}
    </a>
  )
}
