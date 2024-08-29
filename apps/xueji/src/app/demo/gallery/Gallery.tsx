'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './gallery.module.scss'

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
    <motion.div className={styles.thumbnail} variants={thumbnailVariants}>
      <motion.div className={styles.frame} whileHover="hover" variants={frameVariants} transition={transition}>
        <Link href="/demo/gallery/image/[index]" as={`/demo/gallery/image/${i}`} scroll={false} legacyBehavior>
          <motion.img src={id} alt="The Barbican" variants={imageVariants} transition={transition} />
        </Link>
      </motion.div>
    </motion.div>
  </>
)

const Gallery = () => {
  return (
    <>
      <h3 className={styles.title}>Motion</h3>
      <div className={styles.gallery}>
        <motion.div
          className={styles.thumbnails}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
          {images.map((id, i) => (
            <Thumbnail key={id} id={id} i={i} />
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default Gallery
