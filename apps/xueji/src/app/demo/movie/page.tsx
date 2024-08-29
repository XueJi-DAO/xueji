import type { Metadata } from 'next'
import MovieListPage from './MovieListPage'

export const metadata: Metadata = {
  title: 'GraphQL 访问 neo4j 示例',
  description: 'GraphQL 访问 neo4j 示例',
}

export default async function Page() {
  return <MovieListPage />
}
