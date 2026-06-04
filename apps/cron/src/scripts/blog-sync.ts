import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { z } from 'zod'
import { createServiceRoleClient } from '@techstartups/db/server'
import { generateEmbedding } from '../lib/embeddings.js'

// branded type for post slugs — prevents accidental confusion with file paths or other strings
type Slug = string & { readonly _brand: 'Slug' }

const CategorySchema = z.enum(['soonicorn-of-the-month', 'news-room', 'tech-scene'])

const FrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string().transform((slug) => slug as Slug),
  date: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString().split('T')[0] : value),
    z.iso.date()
  ),
  author: z.string().default('TechStartups AI'),
  authorUrl: z.string().url().optional(),
  readingTime: z.string().optional(),
  category: CategorySchema,
  excerpt: z.string(),
  ogImage: z.string(),
  coverImage: z.string(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  startupName: z.string().optional(),
  momentumScore: z.number().optional(),
  signals: z.array(z.string()).optional(),
})

type Frontmatter = z.infer<typeof FrontmatterSchema>

/**
 * Parses and validates raw frontmatter data against the expected schema.
 */
export function validateFrontmatter(data: unknown): Frontmatter {
  return FrontmatterSchema.parse(data)
}

/**
 * Returns a SHA-256 hash of the canonical frontmatter JSON concatenated with the raw MDX body.
 */
export function computeContentHash(
  frontmatterData: Record<string, unknown>,
  rawBody: string
): string {
  const canonicalFrontmatter = JSON.stringify(
    Object.fromEntries(
      Object.entries(frontmatterData).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    )
  )
  return createHash('sha256')
    .update(canonicalFrontmatter + rawBody)
    .digest('hex')
}

// remark-mdx adds mdxjsEsm (imports/exports), mdxJsxFlowElement, mdxJsxTextElement, and
// mdxFlowExpression / mdxTextExpression nodes that have a raw `value` (source code).
// mdast-util-to-string includes that value verbatim, so we use a custom walker instead.
const MDX_SKIP_TYPES = new Set([
  'mdxjsEsm',
  'mdxJsxFlowElement',
  'mdxJsxTextElement',
  'mdxFlowExpression',
  'mdxTextExpression',
])

type TextNode = { type: string; value?: string; children?: TextNode[] }

function collectText(node: TextNode): string {
  if (MDX_SKIP_TYPES.has(node.type)) {
    return ''
  }
  if (typeof node.value === 'string') {
    return node.value
  }
  if (Array.isArray(node.children)) {
    return node.children.map(collectText).join('\n')
  }
  return ''
}

/**
 * Strips MDX imports, JSX components, and expressions, returning plain prose.
 */
export async function extractPlainText(mdxContent: string): Promise<string> {
  const processor = unified().use(remarkParse).use(remarkMdx)
  const tree = processor.parse(mdxContent)
  return collectText(tree as unknown as TextNode).trim()
}

function buildStartupMetadata(frontmatter: Frontmatter): Record<string, unknown> | null {
  const { startupName, momentumScore, signals } = frontmatter

  // return null if no startup fields are present
  if (startupName === undefined && momentumScore === undefined && signals === undefined) {
    return null
  }

  // build the metadata object from whichever fields are present
  const metadata: Record<string, unknown> = {}
  if (startupName !== undefined) {
    metadata.startupName = startupName
  }
  if (momentumScore !== undefined) {
    metadata.momentumScore = momentumScore
  }
  if (signals !== undefined) {
    metadata.signals = signals
  }
  return metadata
}

type SyncResult =
  | { status: 'new'; slug: Slug }
  | { status: 'updated'; slug: Slug }
  | { status: 'skipped'; slug: Slug }
  | { status: 'failed'; slug: Slug; error: unknown }

async function syncFile(
  filePath: string,
  supabase: ReturnType<typeof createServiceRoleClient>,
  options: { forceAll: boolean }
): Promise<SyncResult> {
  // read the file from disk
  let rawContent: string
  try {
    rawContent = readFileSync(filePath, 'utf8')
  } catch (readError) {
    // slug is unknown at this point, so use the file path as the identifier for logging
    return { status: 'failed', slug: filePath as Slug, error: readError }
  }

  // parse frontmatter and validate it against the schema
  const parsed = matter(rawContent)
  let frontmatter: Frontmatter
  try {
    frontmatter = validateFrontmatter(parsed.data)
  } catch (validationError) {
    // slug may be present but unvalidated — use the file path as the identifier for logging
    return { status: 'failed', slug: filePath as Slug, error: validationError }
  }

  // extract plain text and compute a hash of the content
  const plainText = await extractPlainText(parsed.content)
  const contentHash = computeContentHash(parsed.data, parsed.content)

  // check if a row already exists for this slug
  const { data: existingRow, error: selectError } = await supabase
    .from('blog_posts')
    .select('content_hash')
    .eq('slug', frontmatter.slug)
    .maybeSingle()

  if (selectError) {
    return { status: 'failed', slug: frontmatter.slug, error: selectError }
  }

  const isNew = existingRow === null

  // skip the post if the content hasn't changed since the last sync
  if (!options.forceAll && existingRow?.content_hash === contentHash) {
    return { status: 'skipped', slug: frontmatter.slug }
  }

  // generate the embedding vector from the title, excerpt, and body
  let vector: number[]
  let model: string
  try {
    const embeddingResult = await generateEmbedding(
      `${frontmatter.title}\n\n${frontmatter.excerpt}\n\n${plainText}`
    )
    vector = embeddingResult.vector
    model = embeddingResult.model
  } catch (embeddingError) {
    return { status: 'failed', slug: frontmatter.slug, error: embeddingError }
  }

  // upsert the post row into supabase, preserving created_at on updates
  const { error: upsertError } = await supabase.from('blog_posts').upsert(
    {
      slug: frontmatter.slug,
      category: frontmatter.category,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      author: frontmatter.author,
      author_url: frontmatter.authorUrl ?? null,
      reading_time: frontmatter.readingTime ?? null,
      publication_date: frontmatter.date,
      cover_image: frontmatter.coverImage,
      og_image: frontmatter.ogImage,
      featured: frontmatter.featured,
      tags: frontmatter.tags,
      startup_metadata: buildStartupMetadata(frontmatter),
      plain_text: plainText,
      embedding: vector,
      embedding_model: model,
      content_hash: contentHash,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'slug' }
  )

  if (upsertError) {
    return { status: 'failed', slug: frontmatter.slug, error: upsertError }
  }

  return { status: isNew ? 'new' : 'updated', slug: frontmatter.slug }
}

async function main(): Promise<void> {
  // validate required environment variables before doing any work
  if (!process.env.OPENAI_API_KEY) {
    console.error('✗ OPENAI_API_KEY is not set — stopping')
    process.exit(1)
  }

  // parse cli arguments
  const args = process.argv.slice(2)
  const forceAll = args.includes('--all')
  const fileArgIndex = args.indexOf('--file')
  const targetSlug = fileArgIndex !== -1 ? (args[fileArgIndex + 1] ?? null) : null

  // validate that --file was given a value
  if (fileArgIndex !== -1 && targetSlug === null) {
    console.error('✗ --file requires a slug argument, e.g. --file my-post')
    process.exit(1)
  }

  // resolve paths and create the supabase client
  const repoRoot = resolve(process.cwd())
  const contentRoot = join(repoRoot, 'apps/web/content/blog')
  const supabase = createServiceRoleClient()

  const filePaths: string[] = []

  if (targetSlug !== null) {
    // search each category directory for the requested slug
    const categories = ['soonicorn-of-the-month', 'news-room', 'tech-scene']
    let isFound = false
    for (const category of categories) {
      const filePath = join(contentRoot, category, `${targetSlug}.mdx`)
      if (existsSync(filePath)) {
        filePaths.push(filePath)
        isFound = true
        break
      }
    }
    if (!isFound) {
      console.error(`✗ File not found for slug: ${targetSlug}`)
      process.exit(1)
    }
  } else {
    // discover all category directories under the content root
    let categories: string[] = []
    try {
      categories = readdirSync(contentRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    } catch {
      console.log('→ No content directory found, nothing to sync')
      return
    }

    // collect all .mdx files across every category
    for (const category of categories) {
      const categoryDir = join(contentRoot, category)
      const mdxFiles = readdirSync(categoryDir).filter((file) => file.endsWith('.mdx'))
      for (const file of mdxFiles) {
        filePaths.push(join(categoryDir, file))
      }
    }
  }

  if (filePaths.length === 0) {
    console.log('→ No .mdx files found, nothing to sync')
    return
  }

  // sync each file and track the outcome counts
  let newCount = 0
  let updatedCount = 0
  let skippedCount = 0
  let failedCount = 0

  for (const filePath of filePaths) {
    const syncOutcome = await syncFile(filePath, supabase, { forceAll })

    switch (syncOutcome.status) {
      case 'new': {
        console.log(`✓ New: ${syncOutcome.slug}`)
        newCount++
        break
      }
      case 'updated': {
        console.log(`✓ Updated: ${syncOutcome.slug}`)
        updatedCount++
        break
      }
      case 'skipped': {
        console.log(`→ Skipped: ${syncOutcome.slug}`)
        skippedCount++
        break
      }
      case 'failed': {
        console.error(`✗ Failed: ${syncOutcome.slug} — ${String(syncOutcome.error)}`)
        failedCount++
        break
      }
    }
  }

  // print the final summary
  const totalSynced = newCount + updatedCount
  console.log(
    `✓ Synced ${totalSynced} posts (${newCount} new, ${updatedCount} updated, ${skippedCount} skipped, ${failedCount} failed)`
  )

  // trigger isr revalidation if any posts were new or updated
  if (totalSynced > 0) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const revalidateSecret = process.env.REVALIDATE_SECRET
    if (siteUrl && revalidateSecret) {
      try {
        const revalidateResponse = await fetch(`${siteUrl}/api/revalidate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: revalidateSecret, paths: ['/blog'] }),
        })
        if (!revalidateResponse.ok) {
          console.warn(`⚠ Revalidation failed with status ${revalidateResponse.status}`)
        } else {
          console.log('✓ Revalidated /blog')
        }
      } catch (revalidateError) {
        console.warn(`⚠ Revalidation request failed: ${String(revalidateError)}`)
      }
    }
  }

  // exit with a non-zero code if any files failed, so ci can detect failures
  if (failedCount > 0) {
    process.exit(1)
  }
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(`✗ Fatal error: ${String(error)}`)
    process.exit(1)
  })
}
