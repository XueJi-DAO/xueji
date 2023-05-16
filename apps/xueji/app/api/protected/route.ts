import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  if (token) {
    return NextResponse.json({ foo: JSON.stringify(token, null, 2) })
  }
  return NextResponse.json({
    error: '登录后可访问该接口',
  })
}
