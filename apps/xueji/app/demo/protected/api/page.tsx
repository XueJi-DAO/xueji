export default function ApiExamplePage() {
  return (
    <>
      <h1>API 保护示例</h1>
      <p>下面的示例显示来自 API 的响应</p>
      <p>
        <em>登录后可看到返回内容.</em>
      </p>
      <p>/api/session</p>
      <iframe src="/api/session" />
    </>
  )
}
