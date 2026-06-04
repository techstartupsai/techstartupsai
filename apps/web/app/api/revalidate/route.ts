import { timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { requireEnv } from '@/lib/env'

// read once at module load — throws at first request if unset, surfacing misconfig loudly via Sentry
const revalidateSecret = requireEnv('REVALIDATE_SECRET')

/**
 * Returns true iff `candidate` matches `expected` in constant time, regardless of length.
 * Always allocates and compares a buffer of `expected.length` so timing depends on the
 * secret length, not the attacker-supplied candidate length.
 */
function constantTimeEquals(candidate: string, expected: string): boolean {
  const candidateBuffer = Buffer.from(candidate, 'utf8')
  const expectedBuffer = Buffer.from(expected, 'utf8')
  // pad candidate into a buffer the size of the secret — work done is proportional to expected.length
  const paddedCandidate = Buffer.alloc(expectedBuffer.length)
  candidateBuffer.copy(
    paddedCandidate,
    0,
    0,
    Math.min(candidateBuffer.length, expectedBuffer.length)
  )
  // constant-time content compare against the expected buffer
  const contentMatches = timingSafeEqual(paddedCandidate, expectedBuffer)
  // length check is fast on JS numbers and runs after the constant-time compare
  return contentMatches && candidateBuffer.length === expectedBuffer.length
}

/**
 * Busts the Next.js ISR cache for the given paths after verifying the shared secret.
 */
export async function POST(request: Request): Promise<NextResponse> {
  // parse the request body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // reject non-object bodies
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // verify the shared secret in constant time
  const { secret, paths: rawPaths } = body as Record<string, unknown>
  if (typeof secret !== 'string' || !constantTimeEquals(secret, revalidateSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // normalize the paths list, filtering out any non-string values
  const paths = Array.isArray(rawPaths)
    ? rawPaths.filter((path): path is string => typeof path === 'string')
    : ['/blog']

  // revalidate each path
  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: paths })
}
