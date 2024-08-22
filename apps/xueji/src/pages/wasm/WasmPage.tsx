import type { AddModuleExports } from '../../wasm/wasm'
import dynamic from 'next/dynamic'

interface RustComponentProps {
  number: number
}

const RustComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const exports = (await import('../../public/add.wasm')) as AddModuleExports
    const { add_one: addOne } = exports

    // Return a React component that calls the add_one method on the wasm module
    return ({ number }: RustComponentProps) => (
      <div>
        <>{addOne(number)}</>
      </div>
    )
  },
})

export default RustComponent
