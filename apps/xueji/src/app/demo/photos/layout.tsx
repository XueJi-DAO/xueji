import { ReactNode } from 'react'
import GithubCorner from '../../../components/github-corner'

export const metadata = {
  title: '动态路由拦截',
  description: 'A sample Next.js app showing dynamic routing with modals as a route.',
  metadataBase: new URL('https://nextgram.vercel.app'),
}

export default function Layout(props: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      <GithubCorner />
      {props.children}
      {props.modal}
    </>
  )
}
