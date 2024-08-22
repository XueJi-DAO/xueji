'use client'

import { signIn } from 'next-auth/react'

export default function AccessDenied() {
  return (
    <>
      <h1 className="text-red-500">无访问权限</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>
          登录
        </a>
      </p>
    </>
  )
}
