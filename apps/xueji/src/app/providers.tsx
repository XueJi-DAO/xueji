'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/graphql/apollo/client'
import theme from '../lib/theme'
import { RecoilRoot } from 'recoil'
import { CacheProvider } from './emotion-cache-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useApollo({})

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        {/* <ThemeProvider theme={theme}>
          <CssBaseline />
          <CacheProvider>{children}</CacheProvider>
        </ThemeProvider> */}
        {children}
      </ApolloProvider>
    </RecoilRoot>
  )
}
