import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function SignUp() {
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    // 1. 直接调 REST api 接口存数据库
    const body = { email, password }
    const result = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log('===signup===', result)
    if (result.ok) {
      router.push('/auth/signin')
    } else {
      setErrorMsg('失败')
    }
  }

  return (
    <>
      <h1>注册</h1>
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
        <button disabled={!email || !password} type="submit">
          注册
        </button>{' '}
        or <Link href="/auth/signin">登录</Link>
      </form>
    </>
  )
}

export default SignUp
