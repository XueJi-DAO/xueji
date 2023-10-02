'use client'

import Link from './Link'
import { signIn, signOut, useSession } from 'next-auth/react'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from 'app/api/auth/options'
import styles from './header.module.css'

export default function Header() {
  const { data: session, status } = useSession() // 服务端组件中无法使用 useSession
  const loading = status === 'loading'

  return (
    <header>
      <noscript>
        <style>{`.no-js-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`no-js-show ${!session && loading ? styles.loading : styles.loaded}`}>
          {!session && (
            <>
              <span className={styles.notSignedInText}>当前未登录</span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}>
                登录
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span style={{ backgroundImage: `url('${session.user.image}')` }} className={styles.avatar} />
              )}
              <span className={styles.signedInText}>
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}>
                退出
              </a>
            </>
          )}
        </p>
      </div>
      <nav className="flex m-2 font-bold">
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/">
              首页
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo">
              示例
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/mui">
              Mui
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/recoil">
              状态管理
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/tailwindcss">
              样式
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/threejs">
              threejs
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/film">
              GraphQL
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/gallery">
              动画
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/worker">
              web worker
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/protected/server">
              Server
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/protected">
              权限页面
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/protected/api">
              API 权限
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/admin">
              Admin
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/dynamic/123">
              动态路由
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link prefetch={false} href="/demo/photos">
              路由拦截
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
