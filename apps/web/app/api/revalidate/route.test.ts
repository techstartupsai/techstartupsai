import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mocks = vi.hoisted(() => {
  const mockRevalidatePath = vi.fn()
  return { mockRevalidatePath }
})

vi.mock('next/cache', () => ({
  revalidatePath: mocks.mockRevalidatePath,
}))

import { POST } from './route'

function createRequest(body: unknown): Request {
  return new Request('http://localhost/api/revalidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/revalidate', () => {
  beforeEach(() => {
    vi.stubEnv('REVALIDATE_SECRET', 'test-revalidate-secret')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns 200 and calls revalidatePath for a valid secret', async () => {
    const request = createRequest({ secret: 'test-revalidate-secret' })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toEqual({ revalidated: ['/blog'] })
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith('/blog')
  })

  it('returns 401 when the secret is missing', async () => {
    const request = createRequest({})
    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mocks.mockRevalidatePath).not.toHaveBeenCalled()
  })

  it('returns 401 when the secret is wrong', async () => {
    const request = createRequest({ secret: 'wrong-secret' })
    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mocks.mockRevalidatePath).not.toHaveBeenCalled()
  })

  it('filters non-string values from the paths array', async () => {
    const request = createRequest({ secret: 'test-revalidate-secret', paths: ['/blog', 42, null] })
    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mocks.mockRevalidatePath).toHaveBeenCalledTimes(1)
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith('/blog')
  })
})
