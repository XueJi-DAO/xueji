'use client'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useSession } from 'next-auth/react'
import styles from './password.module.css'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChangePasswordProps {}

export const ChangePassword: FC<ChangePasswordProps> = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  if (!session) {
    router.push('/signin')
    return
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false)
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!newPassword) return alert('请输入密码')
    if (newPassword != confirmPassword) return alert('两次密码不一致')
    const result = await fetch('/api/auth/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
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
        <div className={styles.cardWrapper}>
          <Image src="/logo.png" width="100" height="100" alt="Logo" style={{ marginBottom: '20px' }} />
          <div className={styles.cardContent}>
            <Typography variant="h6" component="h1" gutterBottom>
              修改密码
            </Typography>
            <form>
              {errorMsg && <p>{errorMsg}</p>}
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="请输入密码"
                type="password"
                value={newPassword}
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                type="password"
                value={confirmPassword}
              />
              <Button disabled={!newPassword} type="submit" className={styles.primaryBtn} onClick={handleSubmit}>
                确认
              </Button>
              <div className="m-2 text-sm font-normal text-gray-600">
                <Link href="/" className="text-blue-600">
                  返回首页
                </Link>
              </div>
            </form>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message="修改成功"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
