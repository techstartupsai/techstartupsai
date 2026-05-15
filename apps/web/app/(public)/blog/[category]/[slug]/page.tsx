import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { BlogPostHeader } from '@/components/blog/BlogPostHeader'
import { getMdxComponents } from '@/lib/mdx-components'

interface PostFrontmatter {
  title: string
  slug: string
  date: string
  author: string
  category: string
  excerpt: string
  ogImage: string
  coverImage: string
  featured: boolean
  tags: string[]
  readingTime?: string
}

const contentRoot = join(process.cwd(), 'content', 'blog')

const getPost = cache(async (category: string, slug: string) => {
  const filePath = join(contentRoot, category, `${slug}.mdx`)
  let source: string
  try {
    source = readFileSync(filePath, 'utf8')
  } catch {
    return null
  }

  return compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      blockJS: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: getMdxComponents(),
  })
})

export async function generateStaticParams() {
  const categories = readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const params: Array<{ category: string; slug: string }> = []
  for (const category of categories) {
    const files = readdirSync(join(contentRoot, category)).filter((file) => file.endsWith('.mdx'))
    for (const file of files) {
      params.push({ category, slug: file.replace(/\.mdx$/, '') })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const post = await getPost(category, slug)
  if (!post) return {}

  const { frontmatter } = post
  return {
    title: `${frontmatter.title} — TechStartups.ai`,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [{ url: frontmatter.ogImage }],
      type: 'article',
      publishedTime: frontmatter.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const post = await getPost(category, slug)
  if (!post) notFound()

  const { content, frontmatter } = post
  const postUrl = `https://techstartups.ai/blog/${category}/${slug}`

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <BlogPostHeader
        title={frontmatter.title}
        date={frontmatter.date}
        author={frontmatter.author}
        readingTime={frontmatter.readingTime ?? '~9 min read'}
        tags={frontmatter.tags}
        url={postUrl}
        className="mb-10"
      />
      {content}
    </article>
  )
}
