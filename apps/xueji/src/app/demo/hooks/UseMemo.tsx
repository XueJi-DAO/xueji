'use client'

import { useState, useMemo } from 'react'

function Parent() {
  const [time, setTime] = useState(0)
  const [random, setRandom] = useState(0)

  return (
    <>
      <Children time={time}></Children>
      <div className="flex max-w-screen-sm">
        <button onClick={() => setTime(Date.now())} className="mr-2">
          更新时间
        </button>
        <button onClick={() => setRandom(Math.random())}>更新随机数（{random}）</button>
      </div>
    </>
  )
}

// useMemo 在重新渲染之间缓存计算结果，用于跳过昂贵的重新计算
// 在每次后续渲染中，React都会将依赖项与上次渲染时传递的依赖项进行比较。
// 如果依赖项都没有改变(与Object.is相比)，useMemo将返回您之前已经计算过的值。否则，React将重新运行您的计算并返回新值。
// 换句话说，useMemo在重新呈现之间缓存计算结果，直到它的依赖项发生变化。
// const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

// 在开发环境严格模式下，React将调用计算函数两次，不会影响生产。

function Children({ time }: { time: number }) {
  const formatTime = (time = 0) => {
    console.log('formatTime')
    return new Date(time).toLocaleString()
  }
  // const localeTime = formatTime(time) // 未缓存时，点击更新随机数该函数会重复执行。
  const localeTime = useMemo(() => formatTime(time), [time]) // useMemo 箭头函数不能有参数。点击更新随机数不执行 formatTime，点击更新时间会执行两次 formatTime
  return <p>{localeTime}</p>
}

export default Parent
