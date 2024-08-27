import 'server-only' // 防止这种客户端对服务器代码的意外使用，
import NextAuth from 'next-auth'
import { ZodError } from "zod"
import { SignInSchema } from "@xueji/utils"
import { findUser, validatePassword } from './user'
import { authConfig } from "./config"
import { adapter } from './adapter'

import { emailProvider } from './email-provider'
import Credentials from "next-auth/providers/credentials"
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: adapter,
  debug: process.env.NODE_ENV !== "production" ? true : false,
  ...authConfig,
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: '邮箱', type: 'email', placeholder: '输入邮箱' },
        password: { label: '密码', type: 'password', placeholder: '输入密码' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await SignInSchema.parseAsync(credentials)
          const user = await findUser({ email: email })

          if (!user) {
            throw new Error("用户不存在或密码错误")
          }

          if (!await validatePassword(user, password)) {
            throw new Error("用户不存在或密码错误.")
          }
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
    emailProvider,
  ],
})
