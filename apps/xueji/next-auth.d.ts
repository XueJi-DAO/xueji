// Read more at: https://authjs.dev/getting-started/typescript#module-augmentation
import 'next-auth/jwt'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin'
    accessToken?: string
  }
}

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string
    user: {
      role: string
    } & DefaultSession['user']
  }
}
