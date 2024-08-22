import { NextRequest, NextResponse } from 'next/server'
import getDriver from '../../../../lib/neo4j'

const driver = getDriver()
const session = driver.session()

// 访问 neo4j 数据库示例
// 请求：http://localhost:3000/api/neo4j/The Matrix
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { title: string }
  },
) {
  const movieTitle = decodeURIComponent(params.title)
  try {
    const movieTxResultPromise = session.executeRead(async (transaction) => {
      const cypher = `
          MATCH (movie:Movie {title: $movieTitle})
          RETURN movie {.*,
            actors: [ (actor)-[:ACTED_IN]->(movie) | actor.name ],
            directed: [ (director)-[:DIRECTED]->(movie) | director.name ]
          } as movie
        `
      const movieTxResponse = await transaction.run(cypher, {
        movieTitle,
      })
      const [movie] = movieTxResponse.records.map((r) => r.get('movie'))
      return movie
    })
    const movie = await movieTxResultPromise
    return NextResponse.json({ success: true, movie })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
