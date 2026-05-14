import { describe, it, expect, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const mockCreate = vi.fn()
  return { mockCreate }
})

vi.mock('openai', () => ({
  default: class MockOpenAI {
    embeddings = { create: mocks.mockCreate }
  },
}))

import { generateEmbedding } from './embeddings'

describe('generateEmbedding', () => {
  it('returns vector, model, and dimensions', async () => {
    const fakeVector = Array.from({ length: 1536 }, (_element, index) => index / 1536)
    mocks.mockCreate.mockResolvedValue({ data: [{ embedding: fakeVector }] })

    const result = await generateEmbedding('test text')

    expect(result).toEqual({
      vector: fakeVector,
      model: 'text-embedding-3-small',
      dimensions: 1536,
    })
  })

  it('returns a vector of length 1536', async () => {
    const fakeVector = new Array(1536).fill(0.5)
    mocks.mockCreate.mockResolvedValue({ data: [{ embedding: fakeVector }] })

    const { vector } = await generateEmbedding('another text')

    expect(vector).toHaveLength(1536)
  })

  it('returns model string text-embedding-3-small', async () => {
    mocks.mockCreate.mockResolvedValue({ data: [{ embedding: new Array(1536).fill(0) }] })

    const { model } = await generateEmbedding('text')

    expect(model).toBe('text-embedding-3-small')
  })

  it('passes the input text to the OpenAI client', async () => {
    mocks.mockCreate.mockResolvedValue({ data: [{ embedding: new Array(1536).fill(0) }] })

    await generateEmbedding('specific input text')

    expect(mocks.mockCreate).toHaveBeenCalledWith({
      model: 'text-embedding-3-small',
      input: 'specific input text',
    })
  })
})
