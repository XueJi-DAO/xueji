'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './styles.module.scss'

gsap.registerPlugin(useGSAP)

const Gsap = () => {
  const container = useRef(null)
  const tl = useRef()

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed())
  }

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.box')
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, '<')
        .to(boxes[2], { y: -166 })
        .reverse()
    },
    { scope: container },
  )

  return (
    <section className={styles.boxesContainer} ref={container}>
      <h2>Use the button to toggle a Timeline</h2>
      <div>
        <button onClick={toggleTimeline}>Toggle Timeline</button>
      </div>
      <div className={styles.box}>Box 1</div>
      <div className={styles.box}>Box 2</div>
      <div className={styles.box}>Box 3</div>
    </section>
  )
}

export default Gsap
