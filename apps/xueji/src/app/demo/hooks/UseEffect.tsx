'use client'

import { useState, useEffect } from 'react'

// useEffect is a React Hook that lets you synchronize a component with an external system.
// 如果您不尝试与外部系统同步，则可能不需要Effect。
// 为了帮助你找到bug，在开发过程中，React会在安装之前额外运行一次安装和清理。

// 外部系统是指任何不受React控制的代码片段，例如:
// 1. 由setInterval()和clearInterval()管理的计时器。
// 2. 使用window.addEventListener()和window.removeEventListener()的事件订阅。
// 3. 一个第三方动画库，带有类似animation.start()和animation.reset()的API。

// 聊天室
// When the ChatRoom component above gets added to the page, it will connect to the chat room with the initial serverUrl and roomId.
// If either serverUrl or roomId change as a result of a re-render (say, if the user picks a different chat room in a dropdown),
// your Effect will disconnect from the previous room, and connect to the next one. When the ChatRoom component is removed from the page,
// your Effect will disconnect one last time.

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...')
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl)
    },
  }
}

// 封装自定义 hook
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [roomId, serverUrl])
}

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234')

  // useEffect(() => {
  //   const connection = createConnection(serverUrl, roomId)
  //   connection.connect()
  //   return () => {
  //     connection.disconnect()
  //   }
  // }, [roomId, serverUrl])

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
  })

  return (
    <>
      <label>
        Server URL: <input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  )
}

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [show, setShow] = useState(false)
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>{show ? 'Close chat' : 'Open chat'}</button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  )
}

export function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener)
    return () => {
      window.removeEventListener(eventType, listener)
    }
  }, [eventType, listener])
}

export function PointerMove() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useWindowListener('pointermove', (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  })

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  )
}
