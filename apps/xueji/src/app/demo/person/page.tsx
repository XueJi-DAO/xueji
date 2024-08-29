'use client'
import Link from 'next/link'
import useSWR from 'swr'
import type { Person } from '@/types/person'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type PersonProps = {
  person: Person
}

export default function Index() {
  const { data, error, isLoading } = useSWR<Person[]>('/demo/api/people', fetcher)
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  function PersonComponent({ person }: PersonProps) {
    return (
      <li>
        <Link href="/person/[id]" as={`/demo/person/${person.id}`}>
          {person.name}
        </Link>
      </li>
    )
  }

  return (
    <ul>
      {data.map((p) => (
        <PersonComponent key={p.id} person={p} />
      ))}
    </ul>
  )
}
