import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Returns a Supabase client authenticated as the service role, bypassing RLS.
 */
export function createServiceRoleClient() {
  // read required environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY

  // fail fast if either variable is missing
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
  }
  if (!key) {
    throw new Error('SUPABASE_SECRET_KEY is not set')
  }

  // create a service-role client with session management disabled
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
