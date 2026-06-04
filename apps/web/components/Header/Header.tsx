'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { AnchorLink } from '@/components/AnchorLink'
import { NavLinks } from './NavLinks'
import { NavMenu } from './NavMenu'

/**
 * Sticky site header with blur-on-scroll and mobile menu.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // toggle blur once the user scrolls past the top of the page — rAF-throttled to avoid setState floods on mobile
  useEffect(() => {
    let isFrameScheduled = false
    function readScrollPosition() {
      isFrameScheduled = false
      setIsScrolled(window.scrollY > 0)
    }
    function handlePageScroll() {
      if (isFrameScheduled) {
        return
      }
      isFrameScheduled = true
      requestAnimationFrame(readScrollPosition)
    }
    readScrollPosition()
    window.addEventListener('scroll', handlePageScroll, { passive: true })
    return () => window.removeEventListener('scroll', handlePageScroll)
  }, [])

  return (
    <header
      className={cn(
        'relative sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-200',
        isScrolled || isMenuOpen
          ? 'border-b border-border/40 bg-background/60 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <AnchorLink href="/" className="text-base font-semibold text-foreground">
          <span className="text-2xl">🚀</span> TechStartups<span className="text-primary">.ai</span>
        </AnchorLink>
        <NavLinks />
        <NavMenu isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} />
      </div>
    </header>
  )
}
