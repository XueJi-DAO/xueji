/* eslint-disable import/no-named-as-default-member */
// import NextAuth from 'next-auth'
// import { authOptions } from './options'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }

import { handlers } from '../../../../lib/auth'
export const { GET, POST } = handlers
