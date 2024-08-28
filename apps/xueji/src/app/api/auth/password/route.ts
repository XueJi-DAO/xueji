import { NextResponse } from 'next/server'
import { changePassword } from '@/lib/auth/user'
import { auth } from '@/lib/auth/index'

export const POST = auth(async (req) => {
  if (req.auth) {
    const { password } = await req.json()
    await changePassword(req.auth.user, password)
    return NextResponse.json({
      msg: '修改成功',
    })
  }

  return NextResponse.json({
    error: '登录后可访问该接口',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any
