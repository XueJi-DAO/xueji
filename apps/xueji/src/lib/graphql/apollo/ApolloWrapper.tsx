import { HttpLink } from '@apollo/client'
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'

function makeClient() {
  const httpLink = new HttpLink({
    // uri: process.env.NEXT_PUBLIC_XUEJI_SERVER_URL + '/graphql',
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
