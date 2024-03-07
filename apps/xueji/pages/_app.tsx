/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/graphql/apollo/client'
import './styles.css'

function CustomApp({ Component, pageProps: { ...pageProps } }: AppProps<{ initialApolloState: any }>) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <title>学记助理</title>
      </Head>
      <main className="app">
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </main>
    </>
  )
}

export default CustomApp
