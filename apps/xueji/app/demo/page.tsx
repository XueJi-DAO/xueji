// 内置约定：page.tsx 为路由 /demo 创建 UI 界面
// 提示：App Router 模式下默认是服务端组件，onLoad, onReady 和 onError 不能在服务端组件中使用

import Image from 'next/image'
import profilePic from '../../public/logo.png'
import DemoPage from './DemoPage'
// import Counter from '../components/Counter'

// 特性：built-in SEO
// define metadata (e.g. meta and link tags inside your HTML head element) with an explicit metadata configuration in any layout or page.
// Both static and dynamic metadata through generateMetadata are only supported in Server Components。
export const metadata = {
  title: '示例',
  description: '示例页面',
}

async function getNextStar() {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const data: Repository = await res.json()
  // return data.stargazers_count
  return 1111
}

// [段级缓存]允许缓存和重新请求路由中使用的数据。
// 如果页面、布局和获取请求都指定了刷新间隔，那么将使用三者中最小的值。
// export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // 示例：数据获取及缓存配置
  // 请求应该被缓存，直到手动使其失效。cache 默认 `force-cache`. 相当于 `getStaticProps`
  // const staticData = await fetch(`https://...`, { cache: 'force-cache' });

  // 示例：每次页面请求都会重新发送这个请求 相当于 `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

  // 示例：请求缓存 10 秒，相当于`getStaticProps` with the `revalidate` option.
  // const revalidatedData = await fetch(`https://...`, {
  //   next: { revalidate: 10 },
  // });

  // 仅在服务端组件中使用 `cookies()` or `headers()`
  // const theme = cookies().get('theme');

  // 注意：在服务端组件中获取数据, 将数据获取移到服务器上会带来更好的性能和用户体验。
  // 虽然可以在客户端组件中获取数据，但建议在服务器组件中获取数据，除非有特定原因。
  const stars = await getNextStar()

  // 示例：传递数据给客户端组件
  // const recentPosts = await getPosts();
  // return <PostPage recentPosts={recentPosts} />;

  return (
    <>
      <p className="m-2 text-3xl font-bold underline">示例页面</p>
      {/* 提示：内置组件, 大小优化、视觉稳定性、惰性加载、占位符 */}
      <Image alt="logo" width={100} height={100} src={profilePic} />

      {/* 建议：为了提高应用程序的性能，尽可能将客户端组件移动到组件树的叶子位置。
        不要把整个布局做成一个客户端组件，而是把交互逻辑移到一个客户端组件(例如<SearchBar />)，
        并把布局保持为一个服务器组件。这意味着不必将所有 Javascript 组件发送到客户端。 */}
      <DemoPage />
      <div>
        <p>Next.js has {stars} ⭐️</p>
        <div className="app">示例: 全局样式 globals.css</div>

        {/* 示例：环境变量 */}
        <div>服务端环境变量（服务端组件及api中可用）：{process.env.ENV_VARIABLE}</div>
        <div>公共环境变量：{process.env.NEXT_PUBLIC_ENV_VARIABLE}</div>
      </div>
    </>
  )
}
