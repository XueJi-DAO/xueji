import type { Metadata } from 'next'
import FilmListPage from './FilmListPage'

export const metadata: Metadata = {
  title: 'GraphQL 接口示例',
  description: 'GraphQL 接口示例',
}

export default async function Page() {
  return <FilmListPage />
}
