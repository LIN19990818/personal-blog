import request from '@/utils/request'
import { IApiResponse } from '@/types'

export interface SystemSetting {
  id: number
  key: string
  value: string
  description: string | null
  updatedAt: string
}

export interface SystemSettingRequest {
  key: string
  value: string
  description?: string
}

export const settingApi = {
  getAll: () => request.get<SystemSetting[]>('/api/settings'),
  
  getByKey: (key: string) => request.get<SystemSetting>(`/api/settings/${key}`),
  
  save: (data: SystemSettingRequest) => request.post<SystemSetting>('/api/settings', data),
  
  delete: (key: string) => request.delete<void>(`/api/settings/${key}`),
}
