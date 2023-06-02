import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import FormField from '../../components/FormField'

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
      }
    }
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessage(error: any) {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (graphQLError.extensions && graphQLError.extensions.code === 'BAD_USER_INPUT') {
        return graphQLError.message
      }
    }
  }
  return error.message
}

function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    // 1. 直接调 REST api 接口存数据库
    // try {
    //   const body = { name, email }
    //   await fetch(`/api/user`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body),
    //   })
    //   await Router.push('/')
    // } catch (error) {
    //   console.error(error)
    // }
    // 通过 graphql 接口
    try {
      await signUp({
        variables: {
          email,
          password,
        },
      })

      router.push('/auth/signin')
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
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
