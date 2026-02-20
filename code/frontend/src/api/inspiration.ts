import request from '@/utils/request'
import { IApiResponse } from '@/types'

export interface Inspiration {
  id: number
  content: string
  articleId: number | null
  category: string | null
  createdAt: string
  updatedAt: string
}

export interface InspirationCreateRequest {
  content: string
  articleId?: number
  category?: string
}

export const inspirationApi = {
  getAll: () => request.get<Inspiration[]>('/api/inspirations'),
  
  getByCategory: (category: string) => request.get<Inspiration[]>(`/api/inspirations/category/${category}`),
  
  getById: (id: number) => request.get<Inspiration>(`/api/inspirations/${id}`),
  
  create: (data: InspirationCreateRequest) => request.post<Inspiration>('/api/inspirations', data),
  
  update: (id: number, data: InspirationCreateRequest) => request.put<Inspiration>(`/api/inspirations/${id}`, data),
  
  delete: (id: number) => request.delete<void>(`/api/inspirations/${id}`),
}
