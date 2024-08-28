import { auth } from '../../../../lib/auth/index'

export default async function ServerSidePage() {
  const session = await auth() // 服务组件获取登录状态

  return (
    <>
      <h1>服务端渲染</h1>
      <p>
        如果权限信息需要在服务端渲染，推荐使用 <strong>await auth() </strong>
      </p>
      <p>服务端渲染好处是不需要客户端 js 脚本</p>
      <p>不足是每次打开页面需要发送请求获取 session, 渲染速度慢</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  )
}
