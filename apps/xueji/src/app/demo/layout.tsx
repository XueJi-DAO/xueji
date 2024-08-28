// 内置约定：layout.tsx 为路由段及其子段创建共享UI，以包装页面或子段。所有子路由页面都显示该组件
// 内置约定：template.tsx: 类似 layout.tsx，需要创建新组件实例时使用
import DemoLayout from './DemoLayout'
import { GlobalState } from '../../components/utility/global-state'

// import { cookies, headers } from 'next/headers'; // 注意：仅可在服务端组件内部使用

// 示例：Layout 组件接受 slot @views 作为参数，并且可以与 children 并行渲染(Parallel Routing)
// 提示：可以根据是否登录展示不同 slot
// 提示：dashboard/page.js 等同于 dashboard/@children/page.js
// 提示：槽不影响 URL 的结构。文件路径 `/dashboard/@audience/subscribers` 可以在 `/dashboard/subscribers` 访问
// export default function Layout({ children, views }: { children: React.ReactNode; views: React.ReactNode }) {
//   return (
//     <DemoLayout>
//       <div>
//         {children}
//         {views}
//       </div>
//     </DemoLayout>
//   )
// }

export default async function Layout({ children }: { children: React.ReactNode }) {
  // const authHeader = headers().get('authorization');
  // const theme = cookies().get('theme');

  return (
    <GlobalState>
      <DemoLayout>{children}</DemoLayout>
    </GlobalState>
  )
}
