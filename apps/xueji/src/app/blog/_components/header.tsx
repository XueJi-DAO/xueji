// import Link from 'next/link'
import { Link } from 'next-view-transitions'

const Header = () => {
  return (
    <h2 className="mb-20 mt-8 flex items-center text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/blog" className="hover:underline o-blog-title">
        Blog.
      </Link>
    </h2>
  )
}

export default Header
