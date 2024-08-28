import { auth } from '../lib/auth/index'
import SessionData from '@/components/SessionData'
import Image from 'next/image'
import Link from 'next/link'

// async function getData(id: string) {
//   const res = await fetch(`https://.../api/doc/${id}`);
//   return res.json();
// }

// 首页

export default async function Page() {
  const session = await auth() // 服务端组件获取登录状态
  return (
    <>
      <Link prefetch={false} href="/about">
        About
      </Link>
      <Image alt="" src="/images/1.jpg" height={60} width={60} className="col-span-2 aspect-square object-cover" />
      <SessionData session={session} />
    </>
  )
}
