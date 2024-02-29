/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/graphql/apollo/client'
import './styles.css'

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; initialApolloState: any }>) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <title>学记助理</title>
      </Head>
      <main className="app">
        <ApolloProvider client={apolloClient}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ApolloProvider>
      </main>
    </>
  )
}

export default CustomApp
