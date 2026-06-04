import { describe, it, expect, vi, beforeEach } from 'vitest'

// hoisted mocks — available before vi.mock() factories execute
const mocks = vi.hoisted(() => {
  const mockIs = vi.fn()
  const mockEq = vi.fn(() => ({ is: mockIs }))
  const mockUpdate = vi.fn(() => ({ eq: mockEq }))
  const mockFrom = vi.fn(() => ({
    update: mockUpdate,
  }))
  const mockCaptureException = vi.fn()
  const mockRedirect = vi.fn()

  return {
    mockIs,
    mockEq,
    mockUpdate,
    mockFrom,
    mockCaptureException,
    mockRedirect,
  }
})

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mocks.mockFrom,
  })),
}))

vi.mock('@sentry/nextjs', () => ({
  captureException: mocks.mockCaptureException,
}))

// redirect throws to halt execution, matching real Next.js behavior
vi.mock('next/navigation', () => ({
  redirect: mocks.mockRedirect,
}))

import { NextRequest } from 'next/server'
import { POST } from './route'
import { signUnsubscribeToken } from '@/lib/unsubscribe-token'

function createUnsubscribeRequest(formFields: Record<string, string>): NextRequest {
  const body = new URLSearchParams(formFields)
  return new NextRequest('http://localhost/api/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

describe('POST /api/unsubscribe', () => {
  beforeEach(() => {
    // default: update succeeds
    mocks.mockIs.mockReturnValue({ error: null })

    // default: redirect throws to halt execution
    mocks.mockRedirect.mockImplementation((url: string): never => {
      throw new Error(`NEXT_REDIRECT:${url}`)
    })
  })

  it('redirects to /unsubscribed when email and token are valid', async () => {
    const email = 'test@example.com'
    const token = signUnsubscribeToken(email)
    const request = createUnsubscribeRequest({ email, token })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribed')
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/unsubscribed')
  })

  it('redirects to /unsubscribe/invalid when email is missing', async () => {
    const request = createUnsubscribeRequest({ token: 'whatever' })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribe/invalid')
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/unsubscribe/invalid')
    expect(mocks.mockUpdate).not.toHaveBeenCalled()
  })

  it('redirects to /unsubscribe/invalid when token is missing', async () => {
    const request = createUnsubscribeRequest({ email: 'test@example.com' })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribe/invalid')
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/unsubscribe/invalid')
    expect(mocks.mockUpdate).not.toHaveBeenCalled()
  })

  it('redirects to /unsubscribe/invalid when email is malformed', async () => {
    const request = createUnsubscribeRequest({ email: 'not-valid', token: 'whatever' })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribe/invalid')
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/unsubscribe/invalid')
    expect(mocks.mockUpdate).not.toHaveBeenCalled()
  })

  it('redirects to /unsubscribe/invalid when token does not match the email', async () => {
    const tokenForDifferentEmail = signUnsubscribeToken('other@example.com')
    const request = createUnsubscribeRequest({
      email: 'test@example.com',
      token: tokenForDifferentEmail,
    })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribe/invalid')
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/unsubscribe/invalid')
    expect(mocks.mockUpdate).not.toHaveBeenCalled()
  })

  it('redirects to /unsubscribed even when the update fails', async () => {
    const updateError = new Error('database connection lost')
    mocks.mockIs.mockReturnValue({ error: updateError })

    const email = 'test@example.com'
    const token = signUnsubscribeToken(email)
    const request = createUnsubscribeRequest({ email, token })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribed')
    expect(mocks.mockCaptureException).toHaveBeenCalledWith(updateError)
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/unsubscribed')
  })

  it('calls supabase update with the correct filters', async () => {
    const email = 'test@example.com'
    const token = signUnsubscribeToken(email)
    const request = createUnsubscribeRequest({ email, token })

    await expect(POST(request)).rejects.toThrow('NEXT_REDIRECT:/unsubscribed')

    // verify the update targets the correct table and email
    expect(mocks.mockFrom).toHaveBeenCalledWith('waitlist')
    expect(mocks.mockUpdate).toHaveBeenCalledWith({
      unsubscribed_at: expect.any(String),
    })
    expect(mocks.mockEq).toHaveBeenCalledWith('email', email)
    expect(mocks.mockIs).toHaveBeenCalledWith('unsubscribed_at', null)
  })
})
