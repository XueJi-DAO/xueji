export default function Greeting({ person }: { person: { name: string } }) {
  return (
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>{person.name}</i>!
    </p>
  )
}
