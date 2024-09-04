import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Intro() {
  const t = useTranslations('blog')
  return (
    <section className="flex flex-col items-center py-16 md:mb-12 md:flex-row md:justify-between">
      <h1 className="o-blog-title text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
        🗺️{t('title')}
      </h1>
      <h2 className="mt-5 text-center text-lg md:pl-8 md:text-left">
        <span className="relative top-[4px] italic">
          By
          <Link target="_blank" className="scale-100 active:scale-100" href="https://github.com/aaron-zzh">
            <Image
              width={42}
              height={42}
              alt="AaronZZH"
              src="https://avatars.githubusercontent.com/u/95288651?v=4"
              className="relative -top-1 mx-2 inline size-8 rounded-full"
            />
          </Link>
        </span>
      </h2>
    </section>
  )
}
