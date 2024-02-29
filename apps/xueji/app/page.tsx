import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'
import Image from 'next/image'

// async function getData(id: string) {
//   const res = await fetch(`https://.../api/doc/${id}`);
//   return res.json();
// }

// 首页

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Image alt="" src="/images/1.jpg" height={60} width={60} className="object-cover aspect-square col-span-2" />
      <h1>学记助理</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </>
  )
}
