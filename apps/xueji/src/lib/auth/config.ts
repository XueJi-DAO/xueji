import 'server-only'
import { authorized, signin, session, jwt } from './callbacks'
import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  providers: [],
  theme: {
    logo: 'https://xuejiai.oss-cn-beijing.aliyuncs.com/xuejiai.svg',
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#3377dd', // Hex color code
    buttonText: '#FFF', // Hex color code
  },
  session: {
    strategy: 'jwt',
    maxAge: 2592000, // 30 days
  },
  pages: {
    signIn: '/signin', // 自定义登录页
    verifyRequest: '/signin/verify-request',
  },
  callbacks: {
    authorized,
    signIn: signin,
    session,
    jwt,
  },
  debug: process.env.NODE_ENV !== 'production' ? true : false,
}
