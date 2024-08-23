'use client'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
// 示例：全局样式 emotion
import { globalStyles } from './styles'
import Header from './mui/Header'

// 提示：不能将服务端组件直接导入到客户端组件中
// 将一个服务端组件作为子组件或属性传递给客户端组件。children 或 props
const DemoLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  // read the active route segment within that slot
  const loginSegments = useSelectedLayoutSegment()
  // console.log(loginSegments)

  return (
    <div className="flex size-full min-h-screen flex-col justify-between">
      {globalStyles}
      <Header />
      <h2 className="m-2 rounded-lg bg-gray-800 p-2 text-white">pathname:{pathname}</h2>
      <nav>....页面内容 start....</nav>
      {children}
      <nav>....页面内容 end....</nav>
    </div>
  )
}

export default DemoLayout