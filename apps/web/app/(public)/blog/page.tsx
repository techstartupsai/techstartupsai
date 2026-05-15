import type { Metadata } from 'next'
import Image from 'next/image'
import { AnchorLink } from '@/components/AnchorLink'

export const metadata: Metadata = {
  title: 'Blog — TechStartups.ai',
  description: 'Startup intelligence insights, product updates, and founder stories.',
}

// single post — swap for a DB query once more posts ship
const FEATURED_POST = {
  title: "Tech Jobs Aren't Dying. They're Moving.",
  slug: 'tech-jobs-arent-dying-theyre-moving',
  date: '2026-05-14',
  author: 'TechStartups AI',
  category: 'news-room',
  categoryLabel: 'News Room',
  excerpt:
    'Big Tech is downsizing while AI startups scale fast. We break down where talent is actually headed, which roles are growing fastest, and what compensation looks like in the shifting 2026 hiring market.',
  coverImageLight:
    '/blog/news-room/tech-jobs-arent-dying-theyre-moving/images/hero-tech-jobs-shifting-to-ai-economy-light.png',
  coverImageDark:
    '/blog/news-room/tech-jobs-arent-dying-theyre-moving/images/hero-tech-jobs-shifting-to-ai-economy-dark.png',
}

/**
 * Blog index page — minimal single-post view until more posts ship.
 */
export default function BlogPage() {
  const {
    title,
    slug,
    date,
    author,
    category,
    categoryLabel,
    excerpt,
    coverImageLight,
    coverImageDark,
  } = FEATURED_POST

  // parse as local date to avoid UTC-offset display issues
  const [year, month, day] = date.split('-').map(Number)
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* page header */}
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
        <p>Startup intelligence insights, product updates, and founder stories.</p>
      </div>

      {/* post list */}
      <ul className="flex flex-col gap-8">
        <li>
          <AnchorLink
            href={`/blog/${category}/${slug}`}
            target="_blank"
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
          >
            {/* cover image — light and dark variants */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={coverImageLight}
                alt={title}
                fill
                className="object-cover dark:hidden"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
              <Image
                src={coverImageDark}
                alt={title}
                fill
                className="hidden object-cover dark:block"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>

            {/* card body */}
            <div className="flex flex-col gap-3 p-6">
              {/* category badge */}
              <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {categoryLabel}
              </span>

              {/* title */}
              <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                {title}
              </h2>

              {/* excerpt */}
              <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

              {/* byline */}
              <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                <span>{author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={date}>{formattedDate}</time>
              </div>
            </div>
          </AnchorLink>
        </li>
      </ul>
    </div>
  )
}
