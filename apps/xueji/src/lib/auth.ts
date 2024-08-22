import 'server-only' // 防止这种客户端对服务器代码的意外使用，

import NextAuth from 'next-auth'
// import nodemailer from 'nodemailer'
import { findUser, validatePassword } from './user'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import { prisma } from './prisma'

import { PrismaAdapter } from '@auth/prisma-adapter'
// import { Neo4jAdapter } from '@auth/neo4j-adapter'
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Email from 'next-auth/providers/nodemailer'

import type { NextAuthConfig } from 'next-auth'
import { EmailConfig } from 'next-auth/providers/email'

// import getDriver from './neo4j'
// const driver = getDriver()
// const neo4jSession = driver.session()

function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`

  // Some simple styling options
  const backgroundColor = '#f9f9f9'
  const textColor = '#444444'
  const mainBackgroundColor = '#ffffff'
  const buttonBackgroundColor = '#346df1'
  const buttonBorderColor = '#346df1'
  const buttonTextColor = '#ffffff'

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        通过邮箱 <strong>${escapedEmail}</strong> 登录
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">点击登录</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        如果你没有要求这封邮件，你可以安全地忽略它。<br/>
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}
function text({ url, host }: Record<'url' | 'host', string>) {
  return `点击链接登录 ${host}\n${url}\n\n`
}

const emailConfig: EmailConfig = {
  id: 'email',
  type: 'email',
  name: 'Email',
  maxAge: 259200, //3天
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
  options: {},
  // 自定义发送邮件
  async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
    const { host } = new URL(url)
    const transport = nodemailer.createTransport(server)
    console.log('=========', email)
    await transport.sendMail({
      to: email,
      from,
      subject: `点击链接登录 ${host}`,
      text: text({ url, host }),
      html: html({ url, host, email }),
    })
  },
}

const credentialsConfig: CredentialsConfig = {
  id: 'credentials',
  type: 'credentials',
  name: 'credentials',
  credentials: {
    email: { label: '邮箱', type: 'email', placeholder: '输入邮箱' },
    password: { label: '密码', type: 'password', placeholder: '输入密码' },
  },
  async authorize(credentials, req) {
    const user = await findUser({ email: credentials?.email || '' })
    if (user && (await validatePassword(user, credentials?.password))) {
      // Any object returned will be saved in `user` property of the JWT
      return user
    } else {
      // If you return null then an error will be displayed advising the user to check their details.
      return null
      // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    }
  },
}

export const config: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider(credentialsConfig),
    Email(emailConfig),
  ],
  theme: {
    logo: 'https://xuejiai.oss-cn-beijing.aliyuncs.com/xuejiai.svg',
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#3377dd', // Hex color code
    buttonText: '#FFF', // Hex color code
  },
  adapter: PrismaAdapter(prisma), // Neo4jAdapter(neo4jSession),
  session: {
    strategy: 'jwt',
    maxAge: 2592000, // 30 days
  },
  pages: {
    signIn: '/signin', // 自定义登录页
    verifyRequest: '/signin/verify-request',
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      console.log('Please Remove Me. This is a POC', auth)
      if (pathname === '/demo/admin') {
        return auth?.user?.role === 'admin'
      }
      if (pathname === '/me') return !!auth // 登录可访问该页面
      return true
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true
      // const existingUser = await getUserById(user.id as string)
      // 验证邮箱后才可登录
      // if (!user?.emailVerified) return false
      console.log('signIn')
      return true
    },
    async session({ token, session }) {
      if (token?.data?.role && session.user) {
        session.user.role = token.data.role
      }
      return session
    },
    async jwt({ token }) {
      // ...可从数据库获取 user 信息
      // const existingUser = await getUserById(token.sub);
      // if (!existingUser) return token;
      // token.data = user
      token.data = { role: 'admin' }
      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
