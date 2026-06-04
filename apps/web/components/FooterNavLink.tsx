'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AnchorLink } from '@/components/AnchorLink'

interface FooterNavLinkProps {
  href: string
  label: string
}

/**
 * Footer link that highlights itself when its href matches the current route.
 */
export function FooterNavLink({ href, label }: FooterNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <AnchorLink
      href={href}
      className={cn(
        'transition-colors hover:text-foreground',
        isActive && 'font-medium text-foreground'
      )}
    >
      {label}
    </AnchorLink>
  )
}
