'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useJoinWaitlistModal } from '@/lib/useJoinWaitlistModal'
import { ThemeToggle } from './ThemeToggle'
import { NAV_ITEMS } from './nav-items'

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { open: openWaitlistModal } = useJoinWaitlistModal()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // close the menu on escape key press
  useEffect(() => {
    function handlePageKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handlePageKeyPress)
    return () => document.removeEventListener('keydown', handlePageKeyPress)
  }, [])

  // close the menu on click outside
  useEffect(() => {
    function handlePageClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handlePageClick)
    }
    return () => document.removeEventListener('mousedown', handlePageClick)
  }, [isMenuOpen])

  return (
    <div ref={menuRef} className="relative md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={cn(
          'fixed top-14 right-0 left-0 grid w-full transition-[grid-template-rows] duration-300 ease-out',
          isMenuOpen ? 'grid-rows-[1fr]' : 'pointer-events-none grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-b border-border bg-background shadow-xl">
            <nav className="flex flex-col px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block w-full border-b border-border/50 py-3.5 text-base transition-colors last:border-none hover:text-foreground',
                    pathname === item.href
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  openWaitlistModal()
                }}
                className="w-full cursor-pointer border-b border-border/50 py-3.5 text-left text-base text-blue-400 transition-colors hover:text-blue-300"
              >
                Get Started
              </button>
              <ThemeToggle
                showLabel
                className="w-full py-3.5"
                onThemeToggle={() => setIsMenuOpen(false)}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
