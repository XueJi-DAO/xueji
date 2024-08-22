import SingleImage from './SingleImage'
import { images } from '../../constants'

interface ParamsType {
  params: { index: string }
}

const Page = ({ params }: ParamsType) => {
  const index = Number.parseInt(params.index, 10)
  return <SingleImage index={index} />
}

export async function generateStaticParams() {
  return images.map((_id, index) => {
    return {
      index: `${index}`,
    }
  })
}

export default Page
