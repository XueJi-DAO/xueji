import type { NextAuthOptions } from 'next-auth'
// import { Neo4jAdapter } from '@next-auth/neo4j-adapter'
import EmailProvider from 'next-auth/providers/email'
import nodemailer from 'nodemailer'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { findUser, validatePassword } from '../../../../lib/user'

const prisma = new PrismaClient()
// import getDriver from '../../../lib/neo4j'
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

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<'url' | 'host', string>) {
  return `点击链接登录 ${host}\n${url}\n\n`
}

export const authOptions: NextAuthOptions = {
  // debug: true,
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: '登录',
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
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // 自定义发送邮件
      async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
        const { host } = new URL(url)
        const transport = nodemailer.createTransport(server)
        await transport.sendMail({
          to: email,
          from,
          subject: `点击链接登录 ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        })
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],
  pages: {
    signIn: '/auth/signin', // 自定义登录页
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn:' + email, credentials)
      return true
    },
    // async redirect({ url, baseUrl }) {
    //   console.log('redirect', url, baseUrl)
    //   return baseUrl
    // },
    async jwt({ token, account }) {
      token.userRole = 'admin'
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.accessToken = token.accessToken
    //   return session
    // }
  },
  adapter: PrismaAdapter(prisma), // Neo4jAdapter(neo4jSession),
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#3377dd', // Hex color code
    logo: '/logo.png', // Absolute URL to image
    buttonText: '#FFF', // Hex color code
  },
}
