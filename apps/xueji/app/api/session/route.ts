import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/options'

export async function GET() {
  const session = await getServerSession(authOptions)
  return NextResponse.json({
    session: JSON.stringify(session, null, 2),
  })
}
