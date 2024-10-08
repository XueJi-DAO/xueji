import Link from 'next/link'
import { RustServerComponent } from './RustComponent'

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const number = parseInt(searchParams.number || '30')
  return (
    <div>
      <RustServerComponent number={number} />
      <div>
        <Link href={`/demo/wasm?number=${number + 1}`}>+</Link>
      </div>
    </div>
  )
}
