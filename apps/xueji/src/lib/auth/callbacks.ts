/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from 'next/server'
import type { Session } from '@auth/core/types'

export function authorized({ request, auth }: { request: NextRequest; auth: Session | null }) {
  const { pathname } = request.nextUrl
  console.log('Please Remove Me. This is a POC', pathname, auth)
  // 在 middleware.ts 中处理
  // if (pathname === '/demo/admin') {
  //   return auth?.user?.role === "admin"
  // }
  // if (pathname === '/me') return !!auth // 登录可访问该页面
  return true
}

export async function signin({ user, account, profile, email, credentials }: any) {
  // Allow OAuth without email verification
  if (account?.provider !== 'credentials') return true
  // const existingUser = await getUserById(user.id as string)
  // if (!user?.emailVerified) return false // 验证邮箱后才可登录
  console.log('signIn')
  return true
}

export async function session({ token, session }: any) {
  if (token?.accessToken) {
    session.accessToken = token.accessToken
  }
  if (token?.data?.role && session.user) {
    session.user.role = token.data.role
  }
  return session
}

export async function jwt({ token, trigger, session, account }: any) {
  // ...可从数据库获取 user 信息
  // const existingUser = await getUserById(token.sub);
  // if (!existingUser) return token;
  // token.data = user
  if (trigger === 'update') token.name = session.user.name
  if (account?.provider === 'keycloak') {
    return { ...token, accessToken: account.access_token }
  }
  token.data = { role: 'admin' }
  return token
}
