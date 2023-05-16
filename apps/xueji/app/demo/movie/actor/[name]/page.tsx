import ActorPage from './ActorPage'

interface ParamsType {
  params: { name: string }
}
export default async function Page({ params }: ParamsType) {
  const name = decodeURIComponent(params.name)
  return <ActorPage name={name} />
}
