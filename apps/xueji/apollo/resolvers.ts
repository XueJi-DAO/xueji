import { createUser } from '../lib/user'

export const resolvers = {
  Movie: {
    fullName(source: any) {
      return `${source.title} ${source.tagline}`
    },
  },
  Query: {
    info: () => 'hello world',
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input)
      return { user }
    },
  },
}
