import { ApolloServer } from '@apollo/server'
// https://github.com/apollo-server-integrations/apollo-server-integration-next
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { neoSchema } from '../../apollo/schema'

type ExampleContext = {
  req: NextApiRequest
  res: NextApiResponse
}

const server = async (): Promise<ApolloServer<ExampleContext>> => {
  const schema = await neoSchema.getSchema()
  return new ApolloServer<ExampleContext>({ schema })
}

export default startServerAndCreateNextHandler(await server(), {
  context: async (req, res) => ({ req, res }),
})
