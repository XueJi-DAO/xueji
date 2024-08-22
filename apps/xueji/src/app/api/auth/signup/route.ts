import { NextResponse } from 'next/server'
import { createUser } from '../../../../lib/user'
export async function POST(request: Request) {
  // 示例: redirect('https://nextjs.org/');

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();
  const { email, password } = await request.json()
  console.log('======', email, password)
  const user = await createUser({ email, password })
  console.log('======', user)
  return NextResponse.json({ user })
}
