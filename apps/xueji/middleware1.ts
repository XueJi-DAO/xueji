export { auth as middleware } from './lib/auth'

// 通过插件控制，报错
export const config = { matcher: ['/demo/admin'] }

// export function middleware(request: NextRequest) {
// if (request.nextUrl.pathname.startsWith('/about')) {
//   // This logic is only applied to /about
// }

// if (request.nextUrl.pathname.startsWith('/dashboard')) {
//   // This logic is only applied to /dashboard
// }
//   // Call our authentication function to check the request
//   if (!isAuthenticated(request)) {
//     // Respond with JSON indicating an error message
//     return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }), {
//       status: 401,
//       headers: { 'content-type': 'application/json' },
//     })
//   }
// }
