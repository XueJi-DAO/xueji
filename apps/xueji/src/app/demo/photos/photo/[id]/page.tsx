import Photo from '../../../../../components/frame'
import swagPhotos from '../../photos'

export default function PhotoPage({ params: { id } }) {
  const photo = swagPhotos.find((p) => p.id === id)

  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto w-1/2 border border-red-700">
        <Photo photo={photo} />
      </div>
    </div>
  )
}
