import request from '@/utils/request'
import { IApiResponse } from '@/types'

export interface Music {
  id: number
  title: string
  artist: string
  album: string | null
  duration: number
  url: string
  coverUrl: string | null
  displayOrder: number
  uploadedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface MusicCreateRequest {
  title: string
  artist: string
  album?: string
  duration: number
  url: string
  coverUrl?: string
  displayOrder?: number
}

export interface MusicUpdateOrderRequest {
  displayOrder: number
}

export const musicApi = {
  getAll: () => request.get<Music[]>('/api/music'),
  
  getById: (id: number) => request.get<Music>(`/api/music/${id}`),
  
  create: (data: MusicCreateRequest) => request.post<Music>('/api/music', data),
  
  update: (id: number, data: MusicCreateRequest) => request.put<Music>(`/api/music/${id}`, data),
  
  updateOrder: (id: number, data: MusicUpdateOrderRequest) => request.put<Music>(`/api/music/${id}/order`, data),
  
  delete: (id: number) => request.delete<void>(`/api/music/${id}`),
}
