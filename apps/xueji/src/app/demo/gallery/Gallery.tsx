'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { images } from './constants'

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { ...transition, duration: 1.5 },
  },
}

const frameVariants = {
  hover: { scale: 0.95 },
}

const imageVariants = {
  hover: { scale: 1.1 },
}

const Thumbnail = ({ id, i }) => (
  <>
    <motion.div className="thumbnail" variants={thumbnailVariants}>
      <motion.div className="frame" whileHover="hover" variants={frameVariants} transition={transition}>
        <Link href="/demo/gallery/image/[index]" as={`/demo/gallery/image/${i}`} scroll={false} legacyBehavior>
          <motion.img src={id} alt="The Barbican" variants={imageVariants} transition={transition} />
        </Link>
      </motion.div>
    </motion.div>
    <style jsx>
      {`
        .thumbnail {
          flex: 1 0 33%;
          margin: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .frame {
          overflow: hidden;
        }
        .thumbnail img {
          width: 100%;
          height: 100%;
        }
      `}
    </style>
  </>
)

const Gallery = () => {
  return (
    <>
      <h3>Motion</h3>
      <div className="gallery">
        <motion.div
          className="thumbnails"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
          {images.map((id, i) => (
            <Thumbnail key={id} id={id} i={i} />
          ))}
        </motion.div>
      </div>
      <style jsx>
        {`
          h3 {
            font-size: 30px;
            text-align: center;
            position: fixed;
            bottom: -100px;
            z-index: 1;
            color: #f9fbf8;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
          }

          .gallery {
            padding: 40px;
            margin: 0 auto;
            width: 100%;
            max-width: 1200px;
            position: relative;
          }

          .thumbnails {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
          }

          @media screen and (min-width: 600px) {
            h3 {
              font-size: 40px;
              bottom: -40px;
            }
          }

          @media screen and (min-width: 800px) {
            h3 {
              font-size: 60px;
              bottom: -60px;
            }
          }
        `}
      </style>
    </>
  )
}

export default Gallery
