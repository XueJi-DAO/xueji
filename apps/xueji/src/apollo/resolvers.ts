export const resolvers = {
  Movie: {
    fullName(source: any) {
      return `${source.title} ${source.tagline}`
    },
  },
}
