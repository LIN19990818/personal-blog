import request from '@/utils/request'

export interface Timeline {
  id: number
  title: string
  eventDate: string
  description: string | null
  imageUrl: string | null
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface TimelineCreateRequest {
  title: string
  eventDate: string
  description?: string
  imageUrl?: string
  displayOrder?: number
}

export interface TimelineUpdateOrderRequest {
  displayOrder: number
}

export const timelineApi = {
  getAll: () => request.get<Timeline[]>('/api/timeline'),
  
  getById: (id: number) => request.get<Timeline>(`/api/timeline/${id}`),
  
  create: (data: TimelineCreateRequest) => request.post<Timeline>('/api/timeline', data),
  
  update: (id: number, data: TimelineCreateRequest) => request.put<Timeline>(`/api/timeline/${id}`, data),
  
  updateOrder: (id: number, data: TimelineUpdateOrderRequest) => request.put<Timeline>(`/api/timeline/${id}/order`, data),
  
  delete: (id: number) => request.delete<void>(`/api/timeline/${id}`),
}
