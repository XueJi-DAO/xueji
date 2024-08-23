import 'server-only' // 防止这种客户端对服务器代码的意外使用，
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import { findUser, validatePassword } from './user'
import { authorized, signin, session, jwt } from './auth'
import { adapter } from './adapter'

import { emailProvider } from './email-provider'
import Credentials from "next-auth/providers/credentials"
import GitHub from 'next-auth/providers/github'

export const config: NextAuthConfig = {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: '邮箱', type: 'email', placeholder: '输入邮箱' },
        password: { label: '密码', type: 'password', placeholder: '输入密码' },
      },
      async authorize(credentials) {
        const user = await findUser({ email: credentials?.email || '' })
        if (user && (await validatePassword(user, credentials?.password))) {
          // will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    emailProvider,
  ],
  theme: {
    logo: 'https://xuejiai.oss-cn-beijing.aliyuncs.com/xuejiai.svg',
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#3377dd', // Hex color code
    buttonText: '#FFF', // Hex color code
  },
  adapter: adapter,
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
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
