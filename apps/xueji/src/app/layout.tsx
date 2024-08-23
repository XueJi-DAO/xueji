// 全局样式
import './globals.css'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { SessionProvider } from 'next-auth/react'
import { auth } from '../lib/auth'

const inter = Inter({
  subsets: ['latin'],
})

// Config-based Metadata
export const metadata = {
  title: '学记助理: 智能学习助理',
  description: '精准 智能 高效 Get Things Done! 学习笔记 知识问答 知识可视化 AIGC 智能助理 知识图谱 记忆宫殿 元宇宙',
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

// Root layouts: shared across all pages in an application. Must contain html and body tags.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }
  return (
    <html lang="zh-Hans-CN">
      <body className={inter.className}>
        {/* 服务端组件不支持 Provider, 使用客户端组件封装一下 */}
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  )
}