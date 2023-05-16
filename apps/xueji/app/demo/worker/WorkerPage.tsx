'use client'

import { useEffect, useRef, useCallback } from 'react'

// 示例：web worker
const Index = () => {
  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) => alert(`WebWorker Response => ${event.data}`)
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage(100000)
  }, [])

  return (
    <>
      <p>Do work in a WebWorker!</p>
      <button className="p-2 text-3xl" onClick={handleWork}>
        点击计算 PI
      </button>
    </>
  )
}

export default Index
