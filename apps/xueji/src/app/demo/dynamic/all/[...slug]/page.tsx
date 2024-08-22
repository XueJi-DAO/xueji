// 示例：强制捕捉所有子路由
export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <p className="m-8 font-bold">Catch-all Segments</p>
    </>
  )
}
