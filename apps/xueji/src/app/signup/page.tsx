'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../signin/signin.module.css'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'

function SignUp() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false)
  }

  const handleClick = () => {
    setOpen(true)
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    // 1. 直接调 REST api 接口存数据库
    const body = { email, password }
    const result = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (result.ok) {
      setOpen(true)
      router.push('/signin')
    } else {
      setErrorMsg('失败')
    }
  }

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        {/* <div
          className="bg-white flex flex-col items-center rounded-xl p-8 shadow-px shadow-xl"
          style={{ width: '360px', height: '400px' }}> */}
        <div className={styles.cardWrapper}>
          <Image src="/logo.png" width="100" height="100" alt="Logo" style={{ marginBottom: '20px' }} />
          <div className={styles.cardContent}>
            <Typography variant="h6" component="h1" gutterBottom>
              账号注册
            </Typography>
            <form onSubmit={handleSubmit}>
              {errorMsg && <p>{errorMsg}</p>}
              <input
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                type="email"
                value={email}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                type="password"
                value={password}
              />
              <button disabled={!email || !password} type="submit" className={styles.primaryBtn}>
                注册
              </button>
              <h2 onClick={handleClick}>
                <span className="p-2">测试</span>
              </h2>
              <div className="m-2 text-sm font-normal text-gray-600">
                已有账号{' '}
                <Link href="/auth/signin" className="text-blue-600">
                  登录
                </Link>
              </div>
            </form>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message="注册成功"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
