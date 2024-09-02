// import { AddForm } from './add-form'
// import { DeleteForm } from './delete-form'
import prisma from '@/lib/prisma/index'

export default async function Home() {
  const todos = await prisma.todos.findMany()

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      {/* <AddForm /> */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {/* <DeleteForm id={todo.id} todo={todo.title} /> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
