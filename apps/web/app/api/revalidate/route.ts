import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

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

  // verify the shared secret
  const { secret, paths: rawPaths } = body as Record<string, unknown>
  if (typeof secret !== 'string' || secret !== process.env.REVALIDATE_SECRET) {
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
