import { NextRequest, NextResponse } from 'next/server'
import getDriver from '@/lib/neo4j'

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
  const driver = getDriver()
  // 单个会话是多个查询的容器。
  const session = driver.session({ database: 'neo4j' })

  const movieTitle = decodeURIComponent(params.title)
  try {
    // 当通过 executequery() 或 executeRead/Write()提交查询时，服务器会自动将它们包装到一个事务中
    const result = await session.executeRead(async (tx) => {
      return await tx.run(
        `
          MATCH (movie:Movie {title: $movieTitle})
          RETURN movie {.*,
            actors: [ (actor)-[:ACTED_IN]->(movie) | actor.name ],
            directed: [ (director)-[:DIRECTED]->(movie) | director.name ]
          } as movie
        `,
        {
          movieTitle,
        },
      )

      // Result对象支持异步迭代
      // const result = tx.run(
      //   'MERGE (p:Person {name: $name}) RETURN p.name AS name',
      //   { name: 'Alice' }
      // )
      // let names = []
      // for await (const record of result) {
      //   console.log(`Processing ${record.get('name')}`)
      //   names.push(record.get('name'))
      // }
      // return names
    })
    // console.log(`The query \`${result.summary.query.text}\`` + `returned ${result.records.length} nodes.\n`)
    const [movie] = result.records.map((r) => r.get('movie'))

    return NextResponse.json({ success: true, movie })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  } finally {
    driver.close()
  }
}

// 更新
// const { _, summary } = await driver.executeQuery(
//   `MATCH (p:Person {name: $name}) SET p.age = $age`,
//   { name: 'Alice', age: 42 },
//   { database: 'neo4j' },
// )
// console.log('Query counters:')
// console.log(summary.counters.updates())

// 创建
// let { records, summary } = await driver.executeQuery(`
//   MATCH (alice:Person {name: $name})
//   MATCH (bob:Person {name: $friendName})
//   CREATE (alice)-[:KNOWS]->(bob)
//   `, { name: 'Alice', friendName: 'Bob' },
//   { database: 'neo4j' }
// )
// console.log('Query counters:')
// console.log(summary.counters.updates())

// const companyName = 'Neo4j'
// const session = driver.session({database: 'neo4j'})
// try {
//   const names = await session.executeRead(async tx => {
//     const result = await tx.run('MATCH (p:Person) RETURN p.name AS name')
//     return result.records.map(record => record.get('name'))
//   })

//   const relationshipsCreated = await session.executeWrite(tx =>
//     Promise.all(  // group together all Promises
//       names.map(name =>
//         tx.run(`
//           MATCH (emp:Person {name: $personName})
//           MERGE (com:Company {name: $companyName})
//           MERGE (emp)-[:WORKS_FOR]->(com)
//           `, { personName: name, companyName: companyName }
//         )
//         .then(result => result.summary.counters.updates().relationshipsCreated)
//       )
//     ).then(values => values.reduce((a, b) => a + b))  // aggregate results
//   )

//   console.log(`Created ${relationshipsCreated} employees relationships.`)
// } finally {
//   await session.close()

// Reactive API 响应式编程
// const rxjs = require('rxjs');

// const rxSession = driver.rxSession()
// const rxResult = await rxSession.executeWrite(tx => {
//   return tx
//     .run('MERGE (p:Person {name: $name}) RETURN p.name AS name', {
//       name: 'Alice'
//     })
//     .records()
//     .pipe(
//       rxjs.map(record => record.get('name')),
//       //rxjs.materialize(),  // optional, turns outputs into Notifications
//       rxjs.toArray()
//     )
//   })
// const people = await rxResult.toPromise()
// console.log(people)
