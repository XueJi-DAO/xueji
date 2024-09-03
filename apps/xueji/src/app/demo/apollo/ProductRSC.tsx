import { getClient } from '@/lib/graphql/apollo/client'
import { TypedDocumentNode, gql } from '@apollo/client'

export const getProduct: TypedDocumentNode<
  {
    product: {
      description: string
    }
  },
  {
    productId: string
  }
> = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      description
    }
  }
`

export const revalidate = 5

/**
 * Example **Server Component** that uses Apollo Client for data fetching.
 * 服务端组件通过 Apollo Client 获取数据。
 */
export async function ProductRSC() {
  const { data } = await getClient().query({
    query: getProduct,
    variables: {
      productId: 'product:2',
    },
    fetchPolicy: 'no-cache',
  })
  console.log('----ProductRSC----, 仅服务端执行')
  return <div>{data.product && data.product.description}</div>
}
