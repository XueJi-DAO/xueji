'use client'

import { useState, useRef } from 'react'

// useRef is a React Hook that lets you reference a value that’s not needed for rendering.
export function Stopwatch() {
  const [startTime, setStartTime] = useState(null)
  const [now, setNow] = useState(null)
  const intervalRef = useRef(null)

  function handleStart() {
    setStartTime(Date.now())
    setNow(Date.now())

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  function handleStop() {
    clearInterval(intervalRef.current)
  }

  let secondsPassed = 0
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  )
}

export function Counter() {
  const ref = useRef(0)

  function handleClick() {
    ref.current = ref.current + 1
    alert('You clicked ' + ref.current + ' times!')
  }

  return <button onClick={handleClick}>Click me!</button>
}

// Manipulating the DOM with a ref
export function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef(null)

  function handleClick() {
    const nextIsPlaying = !isPlaying
    setIsPlaying(nextIsPlaying)

    if (nextIsPlaying) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }

  return (
    <>
      <video width="250" ref={ref} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </video>
      <button onClick={handleClick}>{isPlaying ? 'Pause' : 'Play'}</button>
    </>
  )
}
