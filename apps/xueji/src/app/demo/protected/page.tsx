import type { Metadata } from 'next'
import ProtectedPage from './protected-page'

export const metadata: Metadata = {
  title: '权限保护',
  description: '权限保护',
}

export default async function Page() {
  return <ProtectedPage />
}
