import { beforeEach, vi } from 'vitest'

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_SECRET_KEY = 'test-secret-key'
process.env.OPENAI_API_KEY = 'test-openai-key'
process.env.NEXT_PUBLIC_SITE_URL = 'https://test.techstartups.ai'
process.env.REVALIDATE_SECRET = 'test-revalidate-secret'

beforeEach(() => {
  vi.clearAllMocks()
})
