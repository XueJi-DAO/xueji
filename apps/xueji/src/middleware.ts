export { auth as middleware } from './lib/auth'

// 通过插件控制
export const config = { matcher: ['/demo/admin'] }

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }


// Or like this if you need to do something here.
// export default auth((req: NextRequest) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
//     if (req.nextUrl.pathname.startsWith('/dashboard')) {
//       // This logic is only applied to /dashboard
//     }
//     // Call our authentication function to check the request
//     if (!isAuthenticated(req)) {
//       // Respond with JSON indicating an error message
//       return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }), {
//         status: 401,
//         headers: { 'content-type': 'application/json' },
//       })
//     }
// })
