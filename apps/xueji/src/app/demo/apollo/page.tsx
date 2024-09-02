import { Suspense } from 'react'
import { FiveRockets } from './FiveRocketsClient'
import { LatestMissionName } from './LatestMissionName'

export default async function Home() {
  return (
    <>
      <article>
        <h2>
          Latest mission: <LatestMissionName />
        </h2>
      </article>
      <article>
        <h2>Five Rockets:</h2>
        <Suspense fallback={<div>loading...</div>}>
          <FiveRockets />
        </Suspense>
      </article>
    </>
  )
}
