// 内置约定：route.ts 为路由 /api 创建服务器端API端点，路由处理程序可以嵌套在 app 目录中，类似于 page.js 和 layout.js。
// 注意：route.js 文件不能与 page.js 在同一路由段级别。
import { NextResponse } from 'next/server'

// 特性：Route Handlers
// 1. 静态路由处理器 Static Route Handlers，Next.js 默认自动执行静态读取。
// 数据将在构建时获取、缓存并在每个请求上多用户重用, 以提高加载性能。可以控制如何缓存和刷新静态数据。
export async function GET() {
  // const cookieStore = cookies() // 示例: cookies
  // const token = cookieStore.get('token') 或者 const token = request.cookies.get('token');
  // const headersList = headers() // 示例: headers
  // const referer = headersList.get('referer')
  // 示例: redirect('https://nextjs.org/');

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();
  return NextResponse.json({ foo: 'bar' })
}

// 2. 动态路由处理器，使用了 `Request` 参数的 Get 方法、其他 HTTP 请求或者使用了类似 cookies 或 headers 动态方法的路由。
// 每次请求都会重新获取数据
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const product = await res.json();

//   return NextResponse.json({ product });
// }

// 示例：CORS
// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!', {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   })
// }

// export const runtime = 'edge'; // 'nodejs' is the default
