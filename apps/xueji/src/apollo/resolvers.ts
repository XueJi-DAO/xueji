export const resolvers = {
  Movie: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fullName(source: any) {
      return `${source.title} ${source.tagline}`
    },
  },
}
