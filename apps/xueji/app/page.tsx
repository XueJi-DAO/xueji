import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'

// async function getData(id: string) {
//   const res = await fetch(`https://.../api/doc/${id}`);
//   return res.json();
// }

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1>入口</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </>
  )
}
