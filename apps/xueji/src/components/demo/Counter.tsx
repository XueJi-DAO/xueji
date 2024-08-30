'use client'

// useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。
// 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，
// 使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

import { useReducer, useContext, createContext, ReactNode, Dispatch } from 'react'

type CounterState = number
type CounterAction =
  | {
      type: 'INCREASE' | 'DECREASE'
    }
  | {
      type: 'INCREASE_BY'
      payload: number
    }

const CounterStateContext = createContext<CounterState>(0)
const CounterDispatchContext = createContext<Dispatch<CounterAction>>(() => null)

const reducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    case 'INCREASE_BY':
      return state + action.payload
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`)
  }
}

type CounterProviderProps = {
  children: ReactNode
  initialValue?: number
}

export const CounterProvider = ({ children, initialValue = 0 }: CounterProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  return (
    <CounterDispatchContext.Provider value={dispatch}>
      <CounterStateContext.Provider value={state}>{children}</CounterStateContext.Provider>
    </CounterDispatchContext.Provider>
  )
}

export const useCount = () => useContext(CounterStateContext)
export const useDispatchCount = () => useContext(CounterDispatchContext)
