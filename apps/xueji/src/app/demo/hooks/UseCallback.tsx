'use client'
import { useState, useCallback } from 'react'

export default function MeasureExample() {
  const [height, setHeight] = useState(0)

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <p>Hello World标签高度为：{Math.round(height)}px</p>
    </>
  )
}

// 如果你正在编写自定义Hook，建议将它返回的所有函数包装到useCallback中:

// function ProductPage({ productId, referrer, theme }) {
//
//   const handleSubmit = useCallback(
//     (orderDetails) => {
//       post('/product/' + productId + '/buy', {
//         referrer,
//         orderDetails,
//       })
//     },
//     [productId, referrer],
//   )

//   return (
//     <div className={theme}>
//       <ShippingForm onSubmit={handleSubmit} />
//     </div>
//   )
// }

import ShippingForm from './ShippingForm'

// 用法1.跳过组件的重新渲染
// 通过在useCallback中包装 handlessubmit，您可以确保在重新呈现之间它是相同的函数
export function ProductPage({ productId, referrer, theme }) {
  function post(url, data) {
    console.log('POST /' + url)
    console.log(data)
  }

  /* Tell React to cache your function between re-renders...*/
  const handleSubmit = useCallback(
    (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      })
    },
    [productId, referrer],
  ) // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  )
}

// 用法2. 根据记忆回调的先前状态更新状态
// function TodoList() {
//   const [todos, setTodos] = useState([]);

//   const handleAddTodo = useCallback((text) => {
//     const newTodo = { id: nextId++, text };
//     setTodos([...todos, newTodo]); // setTodos(todos => [...todos, newTodo]); 可通过箭头函数减少依赖 [todos]
//   }, [todos]);

// 用法3. Preventing an Effect from firing too often
// function ChatRoom({ roomId }) {
//   const [message, setMessage] = useState('');

//   const createOptions = useCallback(() => {
//     return {
//       serverUrl: 'https://localhost:1234',
//       roomId: roomId
//     };
//   }, [roomId]); // ✅ Only changes when roomId changes

//   useEffect(() => { // 或者把 createOptions 方法在此处定义
//     const options = createOptions();
//     const connection = createConnection();
//     connection.connect();
//     return () => connection.disconnect();
//   }, [createOptions]); // ✅ Only changes when createOptions changes
