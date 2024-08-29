import type { Metadata } from 'next'
import Image, { ImageProps } from 'next/image'
import styles from './page.module.scss'
import mountains from '../../../../public/mountains.jpg'

export const metadata: Metadata = {
  title: 'Image Component with Next.js',
  description:
    'This page demonstrates the usage of the next/image component with live examples. This component is designed to automatically optimize images on-demand as the browser requests them.',
}

type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: string
  srcDark: string
}

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props

  return (
    <>
      <Image {...rest} src={srcLight} className="dark:hidden" />
      <Image {...rest} src={srcDark} className="hidden dark:block" />
    </>
  )
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

const ImagePage = () => (
  <div>
    <p className={styles.bgText}>
      Image Component
      <br />
      as a Background and With Placeholder Blur
    </p>
    <div className={styles.bgWrap}>
      <Image
        alt="Mountains"
        src={mountains}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
    <hr className={styles.hr} />
    <Image
      alt="Vercel logo"
      src={mountains}
      width={1000}
      height={1000}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
    <hr className={styles.hr} />
    <h1>Image With Light/Dark Theme Detection</h1>
    <ThemeImage
      alt="Next.js Streaming"
      srcLight="https://assets.vercel.com/image/upload/front/nextjs/streaming-light.png"
      srcDark="https://assets.vercel.com/image/upload/front/nextjs/streaming-dark.png"
      width={588}
      height={387}
    />
    <hr className={styles.hr} />
    <h1>Image Component With Shimmer Data URL</h1>
    <Image
      alt="Mountains"
      src="/mountains.jpg"
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      width={700}
      height={475}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
    <hr className={styles.hr} />
    <h1>Image Component With Layout Fill</h1>
    <div style={{ position: 'relative', width: '300px', height: '500px' }}>
      <Image
        alt="Mountains"
        src={mountains}
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  </div>
)

export default ImagePage
