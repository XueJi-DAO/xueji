'use client'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloWrapper } from '@/lib/graphql/apollo/ApolloWrapper'
import theme from '@/lib/theme'
import { RecoilRoot } from 'recoil'
import { CacheProvider } from './emotion-cache-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ApolloWrapper>
        <CacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </ApolloWrapper>
    </RecoilRoot>
  )
}
