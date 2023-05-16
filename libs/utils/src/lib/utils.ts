export function utils(): string {
  return 'utils'
}

export function pi(n: number) {
  let v = 0
  for (let i = 1; i <= n; i += 4) {
    // increment by 4
    v += 1 / i - 1 / (i + 2) // add the value of the series
  }
  return 4 * v // apply the factor at last
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export { fetcher }
