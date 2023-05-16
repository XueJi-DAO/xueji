'use client'

import { AnimatePresence } from 'framer-motion'
import Gallery from './Gallery'
import { useState } from 'react'

// 示例：framer-motion
function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

const Page = () => {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <h2 onClick={() => setVisible(!visible)}>
        <span className="p-2">点击隐藏</span>
      </h2>
      <AnimatePresence onExitComplete={handleExitComplete}>{visible && <Gallery />}</AnimatePresence>
    </>
  )
}

export default Page
