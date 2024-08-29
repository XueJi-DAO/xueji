'use client'

import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
// import { useSwipeable } from 'react-swipeable'
import Twitter from './Icons/Twitter'

export interface ImageProps {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
}

export interface SharedModalProps {
  index: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}

export const range = (start: number, end: number) => {
  const output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += 1) {
    output.push(i)
  }
  return output
}

export const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

function forceDownload(blobUrl: string, filename: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a: any = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function downloadPhoto(url: string, filename: string) {
  if (!filename) filename = url.split('\\').pop().split('/').pop()
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: 'cors',
  })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob)
      forceDownload(blobUrl, filename)
    })
    .catch((e) => console.error(e))
}

export default function Carousel() {
  const index = 0
  const direction = 0
  const navigation = true
  const images = [
    { id: 1, public_id: '/mountains.jpg' },
    { id: 2, public_id: '/logo.png' },
    { id: 3, public_id: '/images/3.jpg' },
    { id: 4, public_id: '/images/4.jpg' },
    { id: 5, public_id: '/images/5.jpg' },
  ] as ImageProps[]
  const filteredImages = images?.filter((img: ImageProps) => range(index - 15, index + 15).includes(img.id)) || []
  function changePhotoId(newVal: number) {
    return newVal
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function closeModal() {}
  const handlers = {}
  // const handlers = useSwipeable({
  //   onSwipedLeft: () => {
  //     if (index < images?.length - 1) {
  //       changePhotoId(index + 1)
  //     }
  //   },
  //   onSwipedRight: () => {
  //     if (index > 0) {
  //       changePhotoId(index - 1)
  //     }
  //   },
  //   trackMouse: true,
  // })

  const [loaded, setLoaded] = useState(false)

  const currentImage = images ? images[index] : currentPhoto
  // const src = `https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/c_scale,${navigation ? 'w_1280' : 'w_1920'}/${public_id}.${format}`
  // {`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${public_id}.${format}`}
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl" onClick={closeModal}>
        <Image
          src="/images/2.jpg"
          className="pointer-events-none size-full"
          alt="blurred background"
          fill
          priority={true}
        />
      </button>
      <MotionConfig
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}>
        <div
          className="wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center"
          {...handlers}>
          {/* Main image */}
          <div className="w-full overflow-hidden">
            <div className="relative flex aspect-[3/2] items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute">
                  <Image
                    src={currentImage.public_id}
                    width={navigation ? 1280 : 1920}
                    height={navigation ? 853 : 1280}
                    priority
                    alt="Next.js Conf image"
                    onLoad={() => setLoaded(true)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Buttons + bottom nav bar */}
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
            {/* Buttons */}
            {loaded && (
              <div className="relative aspect-[3/2] max-h-full w-full">
                {navigation && (
                  <>
                    {index > 0 && (
                      <button
                        className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        onClick={() => changePhotoId(index - 1)}>
                        <ChevronLeftIcon className="size-6" />
                      </button>
                    )}
                    {index + 1 < images.length && (
                      <button
                        className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        onClick={() => changePhotoId(index + 1)}>
                        <ChevronRightIcon className="size-6" />
                      </button>
                    )}
                  </>
                )}
                <div className="absolute right-0 top-0 flex items-center gap-2 p-3 text-white">
                  {navigation ? (
                    <a
                      href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`}
                      className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                      target="_blank"
                      title="Open fullsize version"
                      rel="noreferrer">
                      <ArrowTopRightOnSquareIcon className="size-5" />
                    </a>
                  ) : (
                    <a
                      href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20pic%20from%20Next.js%20Conf!%0A%0Ahttps://nextjsconf-pics.vercel.app/p/${index}`}
                      className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                      target="_blank"
                      title="Open fullsize version"
                      rel="noreferrer">
                      <Twitter className="size-5" />
                    </a>
                  )}
                  <button
                    onClick={() =>
                      downloadPhoto(
                        `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`,
                        `${index}.jpg`,
                      )
                    }
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    title="Download fullsize version">
                    <ArrowDownTrayIcon className="size-5" />
                  </button>
                </div>
                <div className="absolute left-0 top-0 flex items-center gap-2 p-3 text-white">
                  <button
                    onClick={() => closeModal()}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white">
                    {navigation ? <XMarkIcon className="size-5" /> : <ArrowUturnLeftIcon className="size-5" />}
                  </button>
                </div>
              </div>
            )}
            {/* Bottom Nav bar */}
            {navigation && (
              <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
                <motion.div initial={false} className="mx-auto my-6 flex aspect-[3/2] h-14">
                  <AnimatePresence initial={false}>
                    {filteredImages.map(({ public_id, format, id }) => (
                      <motion.button
                        initial={{
                          width: '0%',
                          x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                        }}
                        animate={{
                          scale: id === index ? 1.25 : 1,
                          width: '100%',
                          x: `${Math.max(index * -100, 15 * -100)}%`,
                        }}
                        exit={{ width: '0%' }}
                        onClick={() => changePhotoId(id)}
                        key={id}
                        className={`${
                          id === index ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10'
                        } ${id === 0 ? 'rounded-l-md' : ''} ${
                          id === images.length - 1 ? 'rounded-r-md' : ''
                        } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}>
                        <Image
                          alt="small photos on the bottom"
                          width={180}
                          height={120}
                          className={`${
                            id === index
                              ? 'brightness-110 hover:brightness-110'
                              : 'brightness-50 contrast-125 hover:brightness-75'
                          } h-full object-cover transition`}
                          src="/mountains.jpg"
                        />
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </MotionConfig>
    </div>
  )
}
