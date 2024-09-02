import Link from 'next/link'
import styles from './styles.module.scss'
import Code from '@/components/Code'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('AboutPage')
  return (
    <div className={styles.container}>
      <div className="absolute right-8 top-8">
        <LocaleSwitcher />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">{t('title')}</h1>
      <div className={styles.card}>
        <h1>Path: /about</h1>
        <hr className={styles.hr} />
        <p>
          The response contains a custom header <Code>X-About-Custom-Header</Code> : <Code>about_header_value</Code>.
        </p>
        <p>To check the response headers of this page, open the Network tab inside your browser inspector.</p>

        <Link href="/">&larr; Back home</Link>
      </div>
    </div>
  )
}
