import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/options'

export default async function ServerSidePage() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <h1>服务端渲染</h1>
      <p>
        该页面在 <strong>getServerSideProps()</strong> 中使用 <strong>getServerSession()</strong>
      </p>
      <p>
        如果权限信息需要在服务端渲染，推荐使用 <strong>getServerSession() </strong>
      </p>
      <p>服务端渲染好处是不需要客户端 js 脚本</p>
      <p>不足是每次打开页面需要发送请求获取 session, 渲染速度慢</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  )
}
