'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AnchorLink } from '@/components/AnchorLink'
import { useJoinWaitlistModal } from '@/lib/useJoinWaitlistModal'
import { ThemeToggle } from './ThemeToggle'
import { NAV_ITEMS } from './nav-items'

/*
 * Desktop navigation links and theme toggle, hidden on mobile.
 */
export function NavLinks() {
  const pathname = usePathname()
  const { open: openWaitlistModal } = useJoinWaitlistModal()

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        return (
          <AnchorLink
            key={item.href}
            href={item.href}
            className={cn(
              'text-base transition-colors',
              isActive
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.label}
          </AnchorLink>
        )
      })}
      <button
        onClick={openWaitlistModal}
        className="text-base text-blue-400 transition-colors hover:text-blue-300"
      >
        Get Started
      </button>
      <ThemeToggle />
    </nav>
  )
}
