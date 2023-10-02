// 全局样式
import './globals.css'

import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
})

// Config-based Metadata
export const metadata = {
  title: '学记助理: 智能学习助理',
  description: '精准 智能 高效 Get Things Done! 学习笔记 知识问答 知识可视化 AIGC 智能助理 知识图谱 记忆宫殿 元宇宙',
  viewport: 'initial-scale=1, width=device-width',
}

// Root layouts: shared across all pages in an application. Must contain html and body tags.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans-CN">
      <body className={inter.className}>
        {/* 服务端组件不支持 Provider, 使用客户端组件封装一下 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
