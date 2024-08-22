// 内置约定：loading.tsx 为路由段及其子段创建加载UI
// In the same folder, loading.js will be nested inside layout.js.
// It will automatically wrap the page.js file and any children below in a <Suspense> boundary.
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div>loading(server side)... by loading.tsx</div>
}
