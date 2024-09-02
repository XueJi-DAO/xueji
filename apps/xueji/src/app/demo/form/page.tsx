import type { Viewport } from 'next'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'React Hook Form',
  description: 'React Hook Form!',
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

export default function Page() {
  return (
    <>
      <LoginForm />
    </>
  )
}
