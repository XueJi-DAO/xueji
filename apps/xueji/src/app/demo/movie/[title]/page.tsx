import Link from 'next/link'
import MoviePage from './MoviePage'

interface ParamsType {
  params: { title: string }
}
export default async function Page({ params }: ParamsType) {
  const title = decodeURIComponent(params.title)
  return (
    <>
      <MoviePage title={title} />
      <div className="back">
        <Link href="/demo/movie" legacyBehavior>
          <a>🔙 Go Back</a>
        </Link>
      </div>
    </>
  )
}
