'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import theme from '../lib/theme'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { CacheProvider } from './emotion-cache-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useApollo({})

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CacheProvider>{children}</CacheProvider>
          </ThemeProvider>
        </SessionProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}
