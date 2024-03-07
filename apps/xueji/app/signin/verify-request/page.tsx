'use client'

import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '../../demo/mui/Link'

export default function VerifyRequestPage() {
  return (
    <div className="flex flex-col justify-center items-center" style={{ height: '100vh' }}>
      <div
        className="bg-white flex flex-col justify-center rounded-xl p-8 shadow-px shadow-xl"
        style={{ width: '360px', height: '400px' }}>
        <div className="card flex flex-col items-center">
          <Image src="/logo.png" width="100" height="100" alt="Logo" style={{ marginBottom: '20px' }} />
          <Typography variant="h5" component="h1" gutterBottom>
            请查收邮件
          </Typography>
          <Typography variant="body1" component="h1" gutterBottom>
            登录链接已发送到您的电子邮箱
          </Typography>
          <Box
            component="div"
            maxWidth="sm"
            sx={{
              my: 1,
            }}>
            <Button variant="contained" component={Link} noLinkStyle href="/">
              返回首页
            </Button>
          </Box>
        </div>
      </div>
    </div>
  )
}
