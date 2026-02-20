import request from '@/utils/request'
import { IApiResponse } from '@/types'

export interface Image {
  id: number
  filename: string
  url: string
  location: string | null
  takenAt: string | null
  description: string | null
  displayOrder: number
  uploadedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ImageCreateRequest {
  filename: string
  url: string
  location?: string
  takenAt?: string
  description?: string
}

export interface ImageUpdateOrderRequest {
  displayOrder: number
}

export const imageApi = {
  getAll: () => request.get<Image[]>('/api/images'),
  
  getById: (id: number) => request.get<Image>(`/api/images/${id}`),
  
  create: (data: ImageCreateRequest) => request.post<Image>('/api/images', data),
  
  update: (id: number, data: ImageCreateRequest) => request.put<Image>(`/api/images/${id}`, data),
  
  updateOrder: (id: number, data: ImageUpdateOrderRequest) => request.put<Image>(`/api/images/${id}/order`, data),
  
  delete: (id: number) => request.delete<void>(`/api/images/${id}`),
}
