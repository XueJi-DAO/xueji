// export { auth as middleware } from "@/lib/auth" // Error: The edge runtime does not support Node.js 'stream' module

import { NextRequest, NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from './lib/auth/config'

const { auth } = NextAuth(authConfig)

const allowedOrigins = ['https://xuejiai.com', 'localhost']
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function cors(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  console.log('origin', origin)
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export default auth((request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return cors(request)
  }

  if (request.nextUrl.pathname === '/demo/admin') {
    // 也可在页面中处理权限
    if (request.auth?.user?.role != 'admin') {
      const signInUrl = request.nextUrl.clone()
      signInUrl.pathname = authConfig.pages?.signIn ?? '/signin'
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.href)
      return NextResponse.redirect(signInUrl)
    }
  }

  if (request.nextUrl.pathname.startsWith('/demo/threejs')) {
    return NextResponse.redirect(new URL('/demo', request.url))
  }
})

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
export const config = { matcher: ['/api/:path*', '/demo/admin', '/demo/threejs'] }

// 路由中间件使用场景，每个项目仅支持一个 middleware.ts
// Some common scenarios where Middleware is particularly effective include:

//     Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.
//     Server-Side Redirects: Redirect users at the server level based on certain conditions (e.g., locale, user role).
//     Path Rewriting: Support A/B testing, feature rollouts, or legacy paths by dynamically rewriting paths to API routes or pages based on request properties.
//     Bot Detection: Protect your resources by detecting and blocking bot traffic.
//     Logging and Analytics: Capture and analyze request data for insights before processing by the page or API.
//     Feature Flagging: Enable or disable features dynamically for seamless feature rollouts or testing.

// Recognizing situations where middleware may not be the optimal approach is just as crucial. Here are some scenarios to be mindful of:

//     Complex Data Fetching and Manipulation: Middleware is not designed for direct data fetching or manipulation, this should be done within Route Handlers or server-side utilities instead.
//     Heavy Computational Tasks: Middleware should be lightweight and respond quickly or it can cause delays in page load. Heavy computational tasks or long-running processes should be done within dedicated Route Handlers.
//     Extensive Session Management: While Middleware can manage basic session tasks, extensive session management should be managed by dedicated authentication services or within Route Handlers.
//     Direct Database Operations: Performing direct database operations within Middleware is not recommended. Database interactions should done within Route Handlers or server-side utilities.
