import { cn } from '@/lib/utils'

interface ImageBlockProps {
  align: 'left' | 'right'
  image: React.ReactNode
  caption?: string
  children: React.ReactNode
  className?: string
}

/**
 * Side-by-side chart + prose layout. On mobile, image stacks above text.
 * align="left"  → image on the left,  prose on the right
 * align="right" → image on the right, prose on the left
 */
export function ImageBlock({ align, image, caption, children, className }: ImageBlockProps) {
  return (
    <div
      className={cn('my-10 flex flex-col gap-6 md:grid md:grid-cols-2 md:items-start', className)}
    >
      <div className={cn('flex flex-col gap-2', align === 'right' && 'md:order-2')}>
        {image}
        {caption && <p className="text-center text-xs text-muted-foreground">{caption}</p>}
      </div>
      <div className={cn(align === 'right' && 'md:order-1')}>{children}</div>
    </div>
  )
}
