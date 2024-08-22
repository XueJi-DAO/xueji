'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { images } from '../../constants'

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
}

const imageVariants = {
  exit: { y: '50%', opacity: 0, transition },
  enter: {
    y: '0%',
    opacity: 1,
    transition,
  },
}

const backVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
}

const SingleImage = ({ index }) => (
  <>
    <motion.div className="single" initial="exit" animate="enter" exit="exit">
      <motion.img variants={imageVariants} src={images[index]} alt="The Barbican" />
      <motion.div className="back" variants={backVariants}>
        <Link href="/demo/gallery">← Back</Link>
      </motion.div>
    </motion.div>
    <style>
      {`
        .single {
            overflow: hidden;
            height: 100vh;
        }

        .single img {
            max-width: 100%;
            max-height: 100vh;
        }

        .back {
            position: fixed;
            top: 150px;
            right: 50px;
            font-size: 54px;
            z-index: 1;
        }

        .back a {
            text-decoration: none;
        }
`}
    </style>
  </>
)

export default SingleImage
