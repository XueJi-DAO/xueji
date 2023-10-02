'use client'
import { createContext, useState } from 'react'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
// 示例：全局样式 emotion
import { globalStyles } from './styles'
import Header from './mui/Header'

// 示例：React Context
export const DemoContext = createContext({ isDemo: false })

// 提示：不能将服务端组件直接导入到客户端组件中
// 将一个服务端组件作为子组件或属性传递给客户端组件。children 或 props
const DemoLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDemo, setIsDemo] = useState(true)

  // read the active route segment within that slot
  const loginSegments = useSelectedLayoutSegment()
  console.log(loginSegments)

  return (
    <>
      {globalStyles}
      <Header />
      <h2 className="bg-gray-800 text-white p-2 m-2 rounded-lg">pathname:{pathname}</h2>
      <nav>....页面内容 start....</nav>
      <DemoContext.Provider value={{ isDemo }}>{children}</DemoContext.Provider>
      <nav>....页面内容 end....</nav>
    </>
  )
}

export default DemoLayout
