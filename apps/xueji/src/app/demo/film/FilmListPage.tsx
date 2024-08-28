'use client'

import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import type { Films } from '../../../types'

const GET_MOVIES = gql`
  query getAllFilms {
    allFilms {
      title
      releaseDate
      director
    }
  }
`

export default function Page() {
  const { loading, error, data } = useQuery<{ allFilms: Films }>(GET_MOVIES)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  return (
    <>
      <div className="flex min-h-screen w-screen flex-col items-center justify-start px-2">
        <main className="flex w-full">
          <div className="flex-1 px-20">
            <div className="align-center mb-6">
              <p>
                <strong>Films</strong> Neo4j example dataset.
              </p>
            </div>
            <table className="w-full border-collapse border-spacing-px border border-solid border-[#dee2e6]">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Film Title</th>
                  <th>Released</th>
                  <th>Director</th>
                </tr>
              </thead>
              <tbody>
                {data?.allFilms.map((film, index) => (
                  <tr className="film" key={film.title}>
                    <th>{index + 1}</th>
                    <td>
                      <Link
                        href="/demo/film/[title]"
                        as={{
                          pathname: `/demo/film/${encodeURIComponent(film.title || '')}`,
                        }}
                        legacyBehavior>
                        {film.title}
                      </Link>
                    </td>
                    <td>{film.releaseDate}</td>
                    <td>{film.director}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <style jsx>{`
          table thead th {
            vertical-align: middle;
            border-bottom: 2px solid #dee2e6;
            border: 1px solid #dee2e6;
            border-bottom-width: 2px;
            padding: 0.75rem;
          }

          table tbody th,
          table tbody td {
            border: 1px solid #dee2e6;
            padding: 0.75rem;
            vertical-align: middle;
          }
        `}</style>
      </div>
    </>
  )
}
