import { cn } from '@/lib/utils'
import { AnchorLink } from '@/components/AnchorLink'
import { FaXTwitter, FaLinkedinIn, FaThreads, FaRedditAlien, FaFacebookF } from 'react-icons/fa6'
import { SiBluesky, SiYcombinator, SiProducthunt, SiSubstack } from 'react-icons/si'
import type { IconType } from 'react-icons'

interface BlogPostShareProps {
  url: string
  title: string
  className?: string
}

interface SharePlatform {
  name: string
  href: string
  Icon: IconType
}

function buildPlatforms(encodedUrl: string, encodedTitle: string): SharePlatform[] {
  return [
    {
      name: 'X',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: FaXTwitter,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: FaLinkedinIn,
    },
    {
      name: 'Bluesky',
      href: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
      Icon: SiBluesky,
    },
    {
      name: 'Threads',
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
      Icon: FaThreads,
    },
    {
      name: 'Reddit',
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      Icon: FaRedditAlien,
    },
    {
      name: 'Hacker News',
      href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`,
      Icon: SiYcombinator,
    },
    {
      name: 'Product Hunt',
      // PH has no share-by-URL intent; opens the submission form
      href: 'https://www.producthunt.com/posts/new',
      Icon: SiProducthunt,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FaFacebookF,
    },
    {
      name: 'Substack',
      // Substack Notes has no pre-fill URL param; opens the compose screen
      href: 'https://substack.com/notes/new',
      Icon: SiSubstack,
    },
  ]
}

/**
 * BlogPostShare — icon-only share links with tooltips for X, LinkedIn, Bluesky, Threads, Reddit, HN, Product Hunt, Facebook, and Substack.
 */
export function BlogPostShare({ url, title, className }: BlogPostShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const platforms = buildPlatforms(encodedUrl, encodedTitle)

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-medium text-muted-foreground">Share this article</p>
      <div className="flex flex-wrap gap-4">
        {platforms.map(({ name, href, Icon }) => (
          <AnchorLink
            key={name}
            href={href}
            noFollow
            aria-label={`Share on ${name}`}
            className="group/tooltip relative text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="h-5 w-5" />
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded border border-border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover/tooltip:opacity-100">
              {name}
            </span>
          </AnchorLink>
        ))}
      </div>
    </div>
  )
}
