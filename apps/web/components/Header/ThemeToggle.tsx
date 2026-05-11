'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  showLabel?: boolean
  className?: string
  onThemeToggle?: (theme: 'light' | 'dark') => void
}

export function ThemeToggle({ showLabel = false, className, onThemeToggle }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  function handleThemeClick() {
    const theme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(theme)
    onThemeToggle?.(theme)
  }

  return (
    <button
      onClick={handleThemeClick}
      aria-label="Toggle theme"
      className={cn(
        'group/tooltip relative flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
    >
      <Moon size={16} className="dark:hidden" />
      <Sun size={16} className="hidden dark:block" />
      {showLabel && (
        <>
          <span className="text-sm dark:hidden">Dark</span>
          <span className="hidden text-sm dark:block">Light</span>
        </>
      )}
      {!showLabel && (
        <span className="pointer-events-none absolute top-full right-0 mt-2 rounded border border-border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover/tooltip:opacity-100">
          <span className="dark:hidden">Dark</span>
          <span className="hidden dark:block">Light</span>
        </span>
      )}
    </button>
  )
}
