'use client'

import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { Actors } from '../../../../../types'

const GET_ACTOR = gql`
  query GetActor($actorName: String) {
    people(where: { name: $actorName }) {
      name
      born
      movies {
        title
      }
    }
  }
`

export default function Actor({ name }: { name: string }) {
  const { loading, error, data } = useQuery<{ people: Actors }>(GET_ACTOR, {
    variables: { actorName: name },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  return (
    <div className="container">
      <main>
        <div className="actor">
          <div className="info">
            <h2>Information</h2>
            <div>
              <strong>Born: </strong>
              {data?.people[0].born}
            </div>
          </div>
          <div className="movies">
            <h2>Movies</h2>
            {data?.people[0]?.movies?.map((movie) => (
              <div key={movie.title}>
                <Link
                  href="/demo/movie/[title]"
                  as={{
                    pathname: `/demo/movie/${encodeURIComponent(movie.title || '')}`,
                  }}
                  legacyBehavior>
                  <a>{movie.title}</a>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="back">
          <Link href="/demo/movie/" legacyBehavior>
            <a>🔙 Go Back</a>
          </Link>
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
          .actor {
            margin-bottom: 2rem;
          }
          .movies div {
            margin-bottom: 5px;
          }
          .movies a {
            text-decoration: underline;
          }
          .back {
            padding: 1rem 0;
          }
          .back a {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  )
}
