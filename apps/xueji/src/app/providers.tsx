'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloWrapper } from '@/lib/graphql/apollo/ApolloWrapper'
import theme from '../lib/theme'
import { RecoilRoot } from 'recoil'
import { CacheProvider } from './emotion-cache-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ApolloWrapper>
        {/* <ThemeProvider theme={theme}>
          <CssBaseline />
        </ThemeProvider> */}
        <CacheProvider>{children}</CacheProvider>
      </ApolloWrapper>
    </RecoilRoot>
  )
}
