import type { AddModuleExports } from '@/wasm/wasm'

export async function RustServerComponent({ number }: { number: number }) {
  // @ts-ignore
  const exports = await import("../../../../public/add.wasm") as AddModuleExports;
  const { add_one: addOne } = exports;
  return <>{addOne(number)}</>;
}
