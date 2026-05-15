import { Badge } from '@techstartups/ui'
import { cn } from '@/lib/utils'
import { BlogPostShare } from '@/components/blog/BlogPostShare'

interface BlogPostHeaderProps {
  title: string
  date: string
  author: string
  readingTime: string
  tags: string[]
  url: string
  className?: string
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * BlogPostHeader — title, byline (date · author · reading time), and tag badges.
 */
export function BlogPostHeader({
  title,
  date,
  author,
  readingTime,
  tags,
  url,
  className,
}: BlogPostHeaderProps) {
  return (
    <header className={cn('space-y-4', className)}>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{title}</h1>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span>{formatDate(date)}</span>
        <span aria-hidden="true">·</span>
        <span>{author}</span>
        <span aria-hidden="true">·</span>
        <span>{readingTime}</span>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <BlogPostShare url={url} title={title} />
    </header>
  )
}
