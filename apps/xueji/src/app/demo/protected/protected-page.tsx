'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied'
import SessionData from '@/components/SessionData'

const ProtectedPage = () => {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/protected')
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    })
  }, [session])

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />
  }

  // If session exists, display content
  return (
    <>
      <h1>权限保护页面</h1>
      <p>
        <strong>{content ?? '\u00a0'}</strong>
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SessionData session={session} />
    </>
  )
}

export default ProtectedPage
