// eslint-disable-next-line import/default
import React from 'react'
import Photo from '../../../../../../components/frame'
import Modal from '../../../../../../components/modal'
import swagPhotos from '../../../photos'

// 示例：Intercepting Routes
export default function PhotoModal({ params: { id: photoId } }) {
  const photos = swagPhotos
  const photo = photoId && photos.find((p) => p.id === photoId)

  return (
    <Modal>
      <Photo photo={photo} />
    </Modal>
  )
}
