/* eslint-disable @typescript-eslint/no-unused-vars */
// 提示：使用`use client`指定为客户端组件, 文件所有依赖(包括子组件)都会打包到客户端。
// 建议首先使用服务端组件，可以在服务端组件中使用客户端组件

'use client'

import { useRef } from 'react'
import useSWR from 'swr'
import { fetcher } from '@xueji/utils'
import { MetaUi } from '@xueji/ui'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)
// 特性：Routing Hooks
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Gsap from '@/components/demo/Gsap'
import TsParticles from '@/components/TsParticles'

const DemoPage = () => {
  // const line1 = useRef(null)
  // const line2 = useRef(null)
  // useGSAP(() => {
  //   gsap.from([line1.current, line2.current], 0.8, {
  //     delay: 0.8,
  //     ease: 'power3.out',
  //     y: 64,
  //     stagger: {
  //       amount: 0.15,
  //     },
  //   })
  // }, [line1, line2])

  const container = useRef(null)
  const { contextSafe } = useGSAP(
    () => {
      setTimeout(() => {
        gsap.to('.good', { rotation: 180 })
      }, 1000)
    },
    { scope: container, revertOnUpdate: true },
  )
  const onClickGood = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: 180 })
  })

  // 注意：这些钩子只在客户端组件中使用。
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
      <TsParticles />

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

      {/* <h1 className="page-title text-6xl">
        <div className="line-wrap h-16">
          <div ref={line1} className="line">
            With-GSAP
          </div>
        </div>
        <div className="line-wrap h-16">
          <div ref={line2} className="line">
            in next.js
          </div>
        </div>
      </h1> */}
      <div ref={container} className="m-4 flex">
        <div className="good mr-2 bg-black p-4"></div>
        <button onClick={onClickGood} className="ok bg-red-500 p-4"></button>
      </div>
      <Gsap />
    </>
  )
}

export default DemoPage
