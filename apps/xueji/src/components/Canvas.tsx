'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dotsAtom, startDrawing, stopDrawing, handleMouseMove } from '../lib/store/atoms'
import type { Point } from '../lib/store/atoms'

const useCanvas = () => ({
  handleMouseDown: useSetRecoilState<boolean>(startDrawing),
  handleMouseUp: useSetRecoilState<boolean>(stopDrawing),
  handleMouseMove: useSetRecoilState<Point[]>(handleMouseMove),
})

const SvgDots = () => {
  const dots: Point[] = useRecoilValue(dotsAtom)
  return (
    <g>
      {dots.map(([x, y], index) => (
        <circle cx={x} cy={y} r="2" fill="#aaa" key={index} />
      ))}
    </g>
  )
}

export default function Canvas() {
  const { handleMouseDown, handleMouseUp, handleMouseMove } = useCanvas()

  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox="0 0 200vw 200vh"
      onMouseDown={() => handleMouseDown(false)}
      onMouseUp={() => handleMouseUp(false)}
      onMouseMove={(e) => {
        handleMouseMove([[e.clientX, e.clientY - 100]])
      }}>
      <rect width="100vw" height="100vh" fill="#eee" />
      <SvgDots />
    </svg>
  )
}
