import { useEffect, useState } from 'react'
import { Image, Modal } from 'antd'
import { imageApi, Image as ImageType } from '@/api'
import Loading from '@/components/common/Loading'

const Gallery = () => {
  const [images, setImages] = useState<ImageType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const response = await imageApi.getAll()
      if (response) {
        setImages(response)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">人间足迹</h1>
          <p className="text-lg text-gray-600">记录生活中的美好瞬间</p>
          <p className="text-sm text-gray-500 mt-2">共 {images.length} 张照片</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-sm font-medium px-2 py-1 rounded">
                {image.displayOrder || index + 1}
              </div>
              <img
                src={image.url}
                alt={image.filename}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {image.location && (
                    <p className="text-sm font-medium">{image.location}</p>
                  )}
                  {image.takenAt && (
                    <p className="text-xs opacity-80">{image.takenAt}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">暂无图片</p>
          </div>
        )}

        <Modal
          open={!!selectedImage}
          footer={null}
          onCancel={() => setSelectedImage(null)}
          width={800}
          centered
        >
          {selectedImage && (
            <div>
              <img
                src={selectedImage.url}
                alt={selectedImage.filename}
                className="w-full rounded-lg"
              />
              <div className="mt-4 space-y-2">
                {selectedImage.location && (
                  <p className="text-gray-700">
                    <span className="font-medium">地点：</span>
                    {selectedImage.location}
                  </p>
                )}
                {selectedImage.takenAt && (
                  <p className="text-gray-700">
                    <span className="font-medium">时间：</span>
                    {selectedImage.takenAt}
                  </p>
                )}
                {selectedImage.description && (
                  <p className="text-gray-600">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default Gallery
