export default function ApiExamplePage() {
  return (
    <>
      <h1>API 保护示例</h1>
      <p>
        下面的示例显示来自 API(/api/session)的响应, <em>登录后可看到返回内容.</em>
      </p>
      <iframe src="/api/session" />
    </>
  )
}
