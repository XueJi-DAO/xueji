/* eslint-disable @typescript-eslint/no-unused-vars */
// 提示：使用`use client`指定为客户端组件, 文件所有依赖(包括子组件)都会打包到客户端。
// 建议首先使用服务端组件，可以在服务端组件中使用客户端组件

'use client' // 13.3.0

import useSWR from 'swr'
import { fetcher } from '@xueji/utils'
import { MetaUi } from '@xueji/ui'

// 特性：Routing Hooks
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const DemoPage = () => {
  // 注意：这些新钩子只在客户端组件中使用。
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 示例：客户端使用 useSWR 获取数据
  const { data, error, isLoading } = useSWR<{ foo: string }>('/demo/api', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // 示例：useEffect 获取数据
  // const [data, setData] = useState({} as { foo: string })
  // useEffect(() => {
  //   fetch('/demo/api')
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  // }, [])

  const replace = false
  return (
    <>
      <MetaUi />
      <h2>接口返回数据: {data?.foo}</h2>
      <a
        href="/"
        onClick={(event) => {
          event.preventDefault()
          replace ? router.replace('/') : router.push('/')
        }}>
        示例：使用 router 跳转
      </a>
    </>
  )
}

export default DemoPage
