import { Neo4jGraphQL } from '@neo4j/graphql'
import typeDefs from './type-defs'
// import { OGM } from '@neo4j/graphql-ogm'
import getDriver from '../lib/neo4j'
import { resolvers } from './resolvers'

const driver = getDriver()
// export const ogm = new OGM({ typeDefs, driver })

export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers,
})
