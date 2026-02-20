import request from '@/utils/request'

export interface IUploadResponse {
  url: string
  filename: string
  size: number
}

export const uploadApi = {
  upload(file: File, type?: string): Promise<IUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    if (type) {
      formData.append('type', type)
    }
    return request.post('/api/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  uploadImage(file: File): Promise<IUploadResponse> {
    return this.upload(file, 'covers')
  },
  uploadAudio(file: File): Promise<IUploadResponse> {
    return this.upload(file, 'audio')
  },
}

export const uploadFile = uploadApi.upload
