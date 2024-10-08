/** @jsxImportSource @emotion/react */
'use client'
import { useContext } from 'react'
import { UIContext } from '../../../lib/context'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Link from './Link'
import ProTip from './ProTip'
import Copyright from './Copyright'
import PopoverMenu from './PopoverMenu'
import { Animated, Basic, bounce, Combined } from '../styles'

const Page = () => {
  const { isDemo, setIsDemo } = useContext(UIContext)
  console.log('=====useContext isDemo:', isDemo)
  setIsDemo(true)
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          示例: Material UI
        </Typography>
        <Slider
          className="my-4"
          defaultValue={30}
          classes={{ active: 'shadow-none' }}
          slotProps={{ thumb: { className: 'hover:shadow-none' } }}
        />

        <PopoverMenu />
        <ProTip />
        <Copyright />
        <div>
          <Basic>示例: Emotion css-in-js</Basic>
          <Combined>
            With <code>:hover</code>.
          </Combined>
          <Animated animation={bounce}>Let&apos;s bounce.</Animated>
        </div>
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            返回首页
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
