import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json() as { email: string; user_type: string | null }
  const { email, user_type } = body

  // TODO: insert into Supabase waitlist table
  console.log("Waitlist signup:", { email, user_type })

  return NextResponse.json({ success: true })
}
