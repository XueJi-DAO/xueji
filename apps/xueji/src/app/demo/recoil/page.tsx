import Counter from '@/components/Counter'
import Canvas from '@/components/Canvas'
export default async function Page() {
  return (
    <>
      <p className="m-2 text-3xl font-bold underline">示例: Recoil 状态管理</p>
      <Counter />
      <Canvas />
    </>
  )
}
