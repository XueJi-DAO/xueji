'use client'
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import { countState, incrementCount, decrementCount } from '../lib/store/atoms'

const useCounter = () => ({
  count: useRecoilValue(countState),
  increment: useSetRecoilState(incrementCount),
  decrement: useSetRecoilState(decrementCount),
  reset: useResetRecoilState(countState),
})

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter()
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <div className="flex">
        <button onClick={increment} className="mr-4 w-[80px]">
          +1
        </button>
        <button onClick={decrement} className="mr-4 w-[80px]">
          -1
        </button>
        <button onClick={reset} className="mr-4 w-[80px]">
          Reset
        </button>
      </div>
    </div>
  )
}

export default Counter
