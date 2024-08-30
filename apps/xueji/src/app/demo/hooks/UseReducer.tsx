'use client'

import { useReducer } from 'react'

export default function Counter() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 10 })

  return (
    <>
      <p>您点击了 {state.count} 次</p>
      <div className="flex max-w-screen-sm">
        <button onClick={() => dispatch({ type: 'decrement' })}>递减</button>
        <button onClick={() => dispatch({ type: 'increment' })} style={{ marginLeft: 10 }}>
          递增
        </button>
      </div>
    </>
  )
}
