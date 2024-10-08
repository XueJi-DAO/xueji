import { NextResponse } from 'next/server'
import { auth } from '../../../lib/auth/index'

export async function GET() {
  const session = await auth()
  return NextResponse.json({
    session: JSON.stringify(session, null, 2),
  })
}
