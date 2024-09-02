// 全局样式
import './globals.css'
// 模块化导入 import styles from './style.module.scss'
import type { Viewport } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Providers } from './providers'
import { SessionProvider } from 'next-auth/react'
import { auth } from '../lib/auth'

const inter = Inter({
  subsets: ['latin'],
})

// Config-based Metadata
export const metadata = {
  title: '学记助理: 与你一同进步',
  description: '知识地图 学习笔记 知识管理 知识可视化 知识问答 数字助理 虚拟空间, Get Things Done in one place!',
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

type Props = {
  children: ReactNode
}

// Root layouts: shared across all pages in an application. Must contain html and body tags.
export default async function RootLayout({ children }: Props) {
  const session = await auth()
  const locale = await getLocale()
  const messages = await getMessages()

  // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
  // filter out sensitive data before passing to client.
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }
  return (
    <html lang={locale == 'en' ? 'en' : 'zh-Hans-CN'}>
      <body className={inter.className}>
        {/* 服务端组件不支持 Provider, 使用客户端组件封装一下 */}
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
