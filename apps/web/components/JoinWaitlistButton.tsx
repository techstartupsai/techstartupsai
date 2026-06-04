'use client'

import { type ReactNode } from 'react'
import { Button } from '@techstartups/ui'
import { cn } from '@/lib/utils'
import { useJoinWaitlistModal } from '@/lib/useJoinWaitlistModal'

interface JoinWaitlistButtonProps {
  variant?: 'default' | 'outline'
  className?: string
  children: ReactNode
}

/**
 * Button that opens the join-waitlist modal. Client island for server-rendered pages.
 */
export function JoinWaitlistButton({
  variant = 'default',
  className,
  children,
}: JoinWaitlistButtonProps) {
  const { open: openWaitlistModal } = useJoinWaitlistModal()

  return (
    <Button variant={variant} className={cn(className)} onClick={openWaitlistModal}>
      {children}
    </Button>
  )
}
