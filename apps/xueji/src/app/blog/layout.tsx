import { ViewTransitions } from 'next-view-transitions'
import Footer from './_components/footer'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
// import { sans } from '@/lib/blog/fonts'

import { ThemeSwitcher } from './_components/theme-switcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Blog Example with ${CMS_NAME}`,
  description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <main className={cn(inter.className, 'dark:bg-slate-900 dark:text-slate-400')}>
        <ThemeSwitcher />
        <div className="">{children}</div>
        <Footer />
      </main>
    </ViewTransitions>
  )
}
