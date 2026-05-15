import Image from 'next/image'
import { cn } from '../lib/utils'

interface ThemedImageProps {
  srcLight: string
  srcDark: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

/**
 * Renders light/dark image variants via CSS class toggling — no useTheme(), no hydration flash.
 * Both <Image> tags are always in the DOM; data-theme drives which one is visible.
 */
export function ThemedImage({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  className,
  priority = false,
}: ThemedImageProps) {
  return (
    <>
      <Image
        src={srcLight}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn('dark:hidden', className)}
      />
      <Image
        src={srcDark}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn('hidden dark:block', className)}
      />
    </>
  )
}
