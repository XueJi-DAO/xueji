import './globals.css'

import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
})

// 注意：不要在该页面添加 <head> 标签如 <title> <meta>.
// 通过 Metadata API 可满足 streaming、de-duplicating Head 元素的高级需求.
export const metadata = {
  title: '学记助理: 智能学习助理',
  description: '轻松、高效 Get Things Done! 学习笔记 知识管理 智能文档 知识可视化 智能助理 知识图谱 记忆宫殿 GET',
  viewport: 'initial-scale=1, width=device-width',
}

// 提示：This layout is shared across all pages in an application. Root layouts must contain html and body tags.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans-CN">
      <body className={inter.className}>
        {/* 服务端组件不支持 Provider， 使用客户端组件封装一下 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
