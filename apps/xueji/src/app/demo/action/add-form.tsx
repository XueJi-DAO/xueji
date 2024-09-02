'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createTodo } from './actions'

const initialState = {
  message: '',
}

function SubmitButton() {
  // useFormStatus 读取父<form>的状态，就好像该表单是一个 Context provider。
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}

export function AddForm() {
  // https://react.dev/blog/2024/04/25/react-19#new-hook-useactionstate
  const [state, formAction] = useActionState(createTodo, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
