'use client'

import { ChangePassword } from '@/components/utility/change-password'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function ChangePasswordPage() {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    router.push('/signin')
    return
  }

  return <ChangePassword />
}
