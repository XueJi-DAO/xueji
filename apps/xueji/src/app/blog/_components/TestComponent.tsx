export default function TestComponent({ name = 'world' }) {
  return (
    <>
      <div className="rounded-lg bg-yellow-100">Hello, {name}!!</div>
    </>
  )
}
