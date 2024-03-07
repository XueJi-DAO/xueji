import { auth } from '../lib/auth'
import SessionData from '../components/SessionData'
import Image from 'next/image'

// async function getData(id: string) {
//   const res = await fetch(`https://.../api/doc/${id}`);
//   return res.json();
// }

// 首页

export default async function Page() {
  const session = await auth() // 服务组件获取登录状态
  return (
    <>
      <Image alt="" src="/images/1.jpg" height={60} width={60} className="object-cover aspect-square col-span-2" />
      <h1>学记助理</h1>
      <SessionData session={session} />
    </>
  )
}
