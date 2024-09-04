// import Link from 'next/link'
import { Link } from 'next-view-transitions'
import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations('blog')

  return (
    <h2 className="mb-20 mt-8 flex items-center text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/blog" className="o-blog-title hover:scale-[1.02] hover:underline">
        🗺️{t('title')}
      </Link>
    </h2>
  )
}

export default Header
