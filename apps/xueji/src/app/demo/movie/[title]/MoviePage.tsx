'use client'

import { gql, useQuery } from '@apollo/client'
import type { Movies } from '../../../../types'

const GET_MOVIE = gql`
  query GetMovie($movieTitle: String) {
    movies(where: { title: $movieTitle }) {
      title
      tagline
      released
      actors {
        name
      }
      directors {
        name
      }
    }
  }
`

export default function Movie({ title }: { title: string }) {
  const { loading, error, data } = useQuery<{ movies: Movies }>(GET_MOVIE, {
    variables: { movieTitle: title },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data?.movies.length === 0) return <div>未找到 {title}</div>

  return (
    <div className="container">
      <main>
        <div className="movie">
          <div className="info">
            <h2>Information</h2>
            <div>
              <strong>Tagline: </strong>
              {data?.movies[0].tagline}
            </div>
            <div>
              <strong>Released: </strong>
              {data?.movies[0].released}
            </div>
          </div>
          <div className="actors">
            <h2>Actors</h2>
            {data?.movies[0].actors?.map((actor) => (
              <div key={actor.name}>{actor.name}</div>
            ))}
          </div>
          <div className="directors">
            <h2>Directors</h2>
            {data?.movies[0].directors?.map((director) => (
              <div key={director.name}>{director.name}</div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>
        {`
          .container {
            width: 80vw;
            min-height: 50vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          main {
            display: flex;
            width: 100%;
            justify-content: center;
            padding: 2rem 0;
            text-align: center;
            flex-direction: column;
          }
          .movie {
            margin-bottom: 2rem;
          }
        `}
      </style>
    </div>
  )
}
