import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// 示例：api 访问权限
export const GET = auth((req) => {
  if (req.auth) {
    return NextResponse.json({ foo: JSON.stringify(req.auth, null, 2) })
  }

  return NextResponse.json({ error: '登录后可访问该接口' }, { status: 401 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any // TODO: Fix `auth()` return type
