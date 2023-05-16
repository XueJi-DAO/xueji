import 'server-only' // 防止这种客户端对服务器代码的意外使用，
// 如果其他开发人员不小心将这些模块中的一个导入到客户端组件中，
// 我们可以使用仅服务器包给他们一个构建时错误。
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY, // 仅服务端能访问到该变量
    },
  })

  return res.json()
}
