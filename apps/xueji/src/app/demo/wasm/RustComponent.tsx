import type { AddModuleExports } from '@/lib/wasm/wasm'

export async function RustServerComponent({ number }: { number: number }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const exports = (await import('../../../../public/add.wasm')) as AddModuleExports
  const { add_one: addOne } = exports
  return <>{addOne(number)}</>
}
