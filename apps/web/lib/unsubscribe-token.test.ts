import { describe, it, expect } from 'vitest'
import { signUnsubscribeToken, verifyUnsubscribeToken } from './unsubscribe-token'

describe('signUnsubscribeToken', () => {
  it('produces a non-empty base64url string', () => {
    const token = signUnsubscribeToken('user@example.com')

    expect(token).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(token.length).toBeGreaterThan(0)
  })

  it('is deterministic for the same email', () => {
    const firstToken = signUnsubscribeToken('user@example.com')
    const secondToken = signUnsubscribeToken('user@example.com')

    expect(firstToken).toBe(secondToken)
  })

  it('produces different tokens for different emails', () => {
    const tokenForAlice = signUnsubscribeToken('alice@example.com')
    const tokenForBob = signUnsubscribeToken('bob@example.com')

    expect(tokenForAlice).not.toBe(tokenForBob)
  })
})

describe('verifyUnsubscribeToken', () => {
  it('accepts a freshly signed token for the same email', () => {
    const email = 'user@example.com'
    const token = signUnsubscribeToken(email)

    expect(verifyUnsubscribeToken(email, token)).toBe(true)
  })

  it('rejects a token signed for a different email', () => {
    const tokenForAlice = signUnsubscribeToken('alice@example.com')

    expect(verifyUnsubscribeToken('bob@example.com', tokenForAlice)).toBe(false)
  })

  it('rejects an empty token', () => {
    expect(verifyUnsubscribeToken('user@example.com', '')).toBe(false)
  })

  it('rejects a malformed token', () => {
    expect(verifyUnsubscribeToken('user@example.com', 'not-a-real-token')).toBe(false)
  })

  it('rejects a token of the wrong length', () => {
    const realToken = signUnsubscribeToken('user@example.com')
    const truncatedToken = realToken.slice(0, realToken.length - 1)

    expect(verifyUnsubscribeToken('user@example.com', truncatedToken)).toBe(false)
  })
})
