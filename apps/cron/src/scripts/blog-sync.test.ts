import { describe, it, expect, vi } from 'vitest'

vi.mock('@techstartups/db/server', () => ({
  createServiceRoleClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
      upsert: vi.fn().mockResolvedValue({ error: null }),
    })),
  })),
}))

vi.mock('../lib/embeddings.js', () => ({
  generateEmbedding: vi.fn().mockResolvedValue({
    vector: new Array(1536).fill(0),
    model: 'text-embedding-3-small',
    dimensions: 1536,
  }),
}))

import { validateFrontmatter, computeContentHash, extractPlainText } from './blog-sync'

const validFrontmatter = {
  title: 'Test Post',
  slug: 'test-post',
  date: '2026-05-13',
  author: 'TechStartups AI',
  category: 'tech-scene',
  excerpt: 'A test excerpt.',
  ogImage: '/images/og-test.png',
  coverImage: '/images/cover-test.png',
}

describe('validateFrontmatter', () => {
  it('parses valid frontmatter without throwing', () => {
    const result = validateFrontmatter(validFrontmatter)

    expect(result.title).toBe('Test Post')
    expect(result.category).toBe('tech-scene')
    expect(result.featured).toBe(false)
    expect(result.tags).toEqual([])
  })

  it('throws when title is missing', () => {
    const { title: _title, ...withoutTitle } = validFrontmatter
    expect(() => validateFrontmatter(withoutTitle)).toThrow()
  })

  it('throws when category is invalid', () => {
    expect(() =>
      validateFrontmatter({ ...validFrontmatter, category: 'momentum-report' })
    ).toThrow()
  })

  it('throws when excerpt is missing', () => {
    const { excerpt: _excerpt, ...withoutExcerpt } = validFrontmatter
    expect(() => validateFrontmatter(withoutExcerpt)).toThrow()
  })

  it('throws when ogImage is missing', () => {
    const { ogImage: _ogImage, ...withoutOgImage } = validFrontmatter
    expect(() => validateFrontmatter(withoutOgImage)).toThrow()
  })

  it('throws when coverImage is missing', () => {
    const { coverImage: _coverImage, ...withoutCoverImage } = validFrontmatter
    expect(() => validateFrontmatter(withoutCoverImage)).toThrow()
  })

  it('accepts optional SOTM-specific fields', () => {
    const result = validateFrontmatter({
      ...validFrontmatter,
      category: 'soonicorn-of-the-month',
      startupName: 'Acme Corp',
      momentumScore: 92,
      signals: ['funding', 'hiring'],
    })

    expect(result.startupName).toBe('Acme Corp')
    expect(result.momentumScore).toBe(92)
    expect(result.signals).toEqual(['funding', 'hiring'])
  })
})

describe('computeContentHash', () => {
  it('returns the same hash for the same inputs (stability across runs)', () => {
    const data = { title: 'Test', slug: 'test', date: '2026-05-13' }
    const body = 'Some MDX content here.'

    const hashA = computeContentHash(data, body)
    const hashB = computeContentHash(data, body)

    expect(hashA).toBe(hashB)
  })

  it('returns a different hash when the body changes', () => {
    const data = { title: 'Test', slug: 'test', date: '2026-05-13' }

    const hashA = computeContentHash(data, 'original body')
    const hashB = computeContentHash(data, 'edited body')

    expect(hashA).not.toBe(hashB)
  })

  it('returns a different hash when frontmatter changes', () => {
    const body = 'Same body'

    const hashA = computeContentHash({ title: 'Old title' }, body)
    const hashB = computeContentHash({ title: 'New title' }, body)

    expect(hashA).not.toBe(hashB)
  })

  it('is stable regardless of frontmatter key insertion order', () => {
    const body = 'Same body'

    const hashA = computeContentHash({ a: '1', b: '2' }, body)
    const hashB = computeContentHash({ b: '2', a: '1' }, body)

    expect(hashA).toBe(hashB)
  })

  it('returns a 64-character lowercase hex string (SHA-256)', () => {
    const hash = computeContentHash({ title: 'Test' }, 'body content')

    expect(hash).toMatch(/^[0-9a-f]{64}$/)
  })
})

describe('extractPlainText', () => {
  it('extracts text from a plain markdown paragraph', async () => {
    const result = await extractPlainText('Hello, world!')

    expect(result).toContain('Hello, world!')
  })

  it('strips JSX component elements', async () => {
    const mdx = '<SomeComponent prop="value" />\n\nActual content here.'
    const result = await extractPlainText(mdx)

    expect(result).not.toContain('SomeComponent')
    expect(result).toContain('Actual content here.')
  })

  it('strips import statements', async () => {
    const mdx = "import SomeComponent from './SomeComponent'\n\nActual content here."
    const result = await extractPlainText(mdx)

    expect(result).not.toContain('import')
    expect(result).toContain('Actual content here.')
  })

  it('extracts text from headings and paragraphs', async () => {
    const mdx = '## Section Heading\n\nParagraph text below the heading.'
    const result = await extractPlainText(mdx)

    expect(result).toContain('Section Heading')
    expect(result).toContain('Paragraph text below the heading.')
  })
})
