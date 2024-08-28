'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Image from 'next/image'
import styles from './signin.module.css'

export type SignInErrorTypes =
  | 'Signin'
  | 'OAuthSignin'
  | 'OAuthCallback'
  | 'OAuthCreateAccount'
  | 'EmailCreateAccount'
  | 'Callback'
  | 'OAuthAccountNotLinked'
  | 'EmailSignin'
  | 'CredentialsSignin'
  | 'SessionRequired'
  | 'default'

const errors: Record<SignInErrorTypes, string> = {
  Signin: '请尝试用另一个帐户登录。',
  OAuthSignin: '请尝试用另一个帐户登录。',
  OAuthCallback: '请尝试用另一个帐户登录。',
  OAuthCreateAccount: '请尝试用另一个帐户登录。',
  EmailCreateAccount: '请尝试用另一个帐户登录。',
  Callback: '请尝试用另一个帐户登录。',
  OAuthAccountNotLinked: '为了确认您的身份，请使用您最初使用的相同帐户登录。',
  EmailSignin: '邮件发送失败',
  CredentialsSignin: '登录失败, 请检查您提供的登录信息是否正确。',
  SessionRequired: '请登录后可访问该页面',
  default: '登录失败',
}

const Signin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const [csrfToken, setCsrf] = useState('')
  const [providers, setProviders] = useState({})
  useEffect(() => {
    fetch('/api/auth/csrf')
      .then((res) => res.json())
      .then((data) => setCsrf(data.csrfToken))
    fetch('/api/auth/providers')
      .then((res) => res.json())
      .then((data) => setProviders(data))
  }, [session])

  const errorType = searchParams?.get('error')
  const callbackUrl = searchParams?.get('callbackUrl')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const error = errorType && (errors[errorType] ?? errors.default)
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <Image src="/logo.png" width="100" height="100" alt="Logo" style={{ marginBottom: '20px' }} />
          <div className={styles.cardContent}>
            {error && (
              <div className="py-4 text-red-500">
                <p>{error}</p>
              </div>
            )}

            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.id} className="provider" style={{ marginBottom: '10px', paddingTop: '10px' }}>
                    {provider.type === 'email' ? (
                      <form method="post" action="/api/auth/signin/email">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <input placeholder="请输入邮箱" id="email" name="email" />
                        <button type="submit" className={styles.primaryBtn}>
                          邮箱登录
                        </button>
                      </form>
                    ) : null}
                    {provider.type === 'credentials' ? (
                      <form method="post" action="/api/auth/callback/credentials">
                        <label>密码登录</label>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <input name="email" type="email" placeholder="请输入邮箱" />
                        <input name="password" type="password" placeholder="请输入密码" />
                        <button type="submit" className={styles.primaryBtn}>
                          登录
                        </button>
                      </form>
                    ) : null}
                    {provider.type === 'oauth' || provider.type === 'oidc' ? (
                      <form action={provider.signinUrl} method="POST">
                        <input type="hidden" name="csrfToken" value={csrfToken} />
                        {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
                        <button type="submit" className="button" tabIndex={0}>
                          <span>通过 {provider.name} 登录</span>
                        </button>
                      </form>
                    ) : null}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
