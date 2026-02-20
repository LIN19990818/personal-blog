import request from '@/utils/request'
import { IApiResponse } from '@/types'

export interface City {
  id: number
  name: string
  latitude: number
  longitude: number
  visitCount: number
  firstVisit: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface CityCreateRequest {
  name: string
  latitude: number
  longitude: number
  visitCount?: number
  firstVisit: string
  notes?: string
}

export const cityApi = {
  getAll: () => request.get<City[]>('/api/cities'),
  
  getById: (id: number) => request.get<City>(`/api/cities/${id}`),
  
  create: (data: CityCreateRequest) => request.post<City>('/api/cities', data),
  
  update: (id: number, data: CityCreateRequest) => request.put<City>(`/api/cities/${id}`, data),
  
  delete: (id: number) => request.delete<void>(`/api/cities/${id}`),
}
