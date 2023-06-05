// import { useSession } from 'next-auth/react' // 服务端组件中无法使用
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'

export default async function Page() {
  // const { data } = useSession() // 服务端组件中无法使用
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1>首页</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </>
  )
}
