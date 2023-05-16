import { withAuth } from 'next-auth/middleware'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === '/demo/admin') {
        return token?.userRole === 'admin'
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})

export const config = { matcher: ['/demo/admin', '/me'] }

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
