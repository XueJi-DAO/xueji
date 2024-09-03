'use client'

import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client'

export const getProducts: TypedDocumentNode<{
  listAllProducts: Array<{
    id: string
    title: string
  }>
}> = gql`
  query ExampleQuery {
    listAllProducts {
      id
      title
      description
      mediaUrl
      variants {
        id
        price
      }
    }
  }
`

/**
 * Example Client Component that uses Apollo Client's `useSuspenseQuery` hook for data fetching.
 */
export function ProductsClient() {
  const { data } = useSuspenseQuery(getProducts)
  console.log('===ProductsClient===, 服务端客户端都会执行')
  return (
    <ul>
      {data.listAllProducts.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  )
}
