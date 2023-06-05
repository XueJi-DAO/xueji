import { useRouter } from 'next/router'
import { useSession, signIn, getCsrfToken, getProviders } from 'next-auth/react'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../app/api/auth/[...nextauth]/options'
import Image from 'next/image'
import styles from './signin.module.css'
import type { InternalProvider, Theme } from 'next-auth/src/core/types'

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
  CredentialsSignin: '登录失败。请检查您提供的登录信息是否正确。',
  SessionRequired: '请登录后可访问该页面',
  default: '登录失败',
}

export interface SignInServerPageParams {
  csrfToken: string
  providers: InternalProvider[]
  callbackUrl: string
  email: string
  error?: SignInErrorTypes
  theme: Theme
}

const Signin = (props: SignInServerPageParams) => {
  const { csrfToken, providers = [] } = props
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.replace('/')
  }
  const {
    query: { error: errorType },
  } = useRouter()
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
            <form method="post" action="/api/auth/signin/email">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input placeholder="请输入邮箱" id="email" name="email" />
              <button type="submit" className={styles.primaryBtn}>
                邮箱登录
              </button>
            </form>
            <hr />
            <form method="post" action="/api/auth/callback/credentials">
              <label>密码登录</label>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input name="email" type="email" placeholder="请输入邮箱" />
              <input name="password" type="password" placeholder="请输入密码" />
              <button type="submit" className={styles.primaryBtn}>
                登录
              </button>
            </form>
            <hr />
            {providers &&
              Object.values(providers).map((provider) => {
                if (provider.type == 'email' || provider.type == 'credentials') return null
                else {
                  return (
                    <div key={provider.name} style={{ marginBottom: 0 }}>
                      <button onClick={() => signIn(provider.id)}>
                        {/* <Image
                          src={`${provider.style.logo.startsWith('/') ? logos : ''}${provider.style.logo}`}
                          width="24"
                          height="24"
                          id="provider-logo"
                          alt="provider-logo"
                        /> */}
                        <span>通过 {provider.name} 登录</span>
                      </button>
                    </div>
                  )
                }
              })}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Artboard.svg" alt="Pattern Background" layout="fill" className={styles.styledPattern} />
    </div>
  )
}

export default Signin

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    console.log('已登录')
    return { redirect: { destination: '/' } }
  }
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken,
    },
  }
}
