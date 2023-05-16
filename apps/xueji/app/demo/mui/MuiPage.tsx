/** @jsxImportSource @emotion/react */
'use client'
import { useContext } from 'react'
import { DemoContext } from '../DemoLayout'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from './Link'
import ProTip from './ProTip'
import Copyright from './Copyright'
import { Animated, Basic, bounce, Combined } from '../styles'

const Page = () => {
  const { isDemo } = useContext(DemoContext)
  console.log(isDemo)
  return (
    <Container maxWidth="lg">
      <Box
        component="div"
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h6" component="h1" gutterBottom>
          示例: Material UI
        </Typography>
        <Box component="div" maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            返回首页
          </Button>
        </Box>
        <ProTip />
        <Copyright />
        <div>
          <Basic>示例: Emotion css-in-js</Basic>
          <Combined>
            With <code>:hover</code>.
          </Combined>
          <Animated animation={bounce}>Let&apos;s bounce.</Animated>
        </div>
      </Box>
    </Container>
  )
}

export default Page
