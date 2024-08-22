const { toGraphQLTypeDefs } = require("@neo4j/introspector")
const neo4j = require("neo4j-driver")
const fs = require('fs')

const driver = neo4j.driver(
  "neo4j://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
)

const sessionFactory = () => driver.session({ defaultAccessMode: neo4j.session.READ })

// We create a async function here until "top level await" has landed
// so we can use async/await
async function main() {
  const typeDefs = await toGraphQLTypeDefs(sessionFactory)
  fs.writeFileSync('schema.graphql', typeDefs)
  await driver.close();

  // const readonly = true; // We don't want to expose mutations in this case
  // const typeDefs = await toGraphQLTypeDefs(sessionFactory, readonly)
  // const neoSchema = new Neo4jGraphQL({ typeDefs, driver });
  // const server = new ApolloServer({
  //   schema: await neoSchema.getSchema(),
  //   context: ({ req }) => ({ req }),
  // });
}
main()
