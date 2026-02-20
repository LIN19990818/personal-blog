import request from '@/utils/request'
import { ILoginRequest, ILoginResponse, IAdmin, IAdminUpdateRequest, IPasswordUpdateRequest } from '@/types'

export const authApi = {
  login(data: ILoginRequest): Promise<ILoginResponse> {
    return request.post('/api/auth/login', data)
  },
  logout(): Promise<void> {
    return request.post('/api/auth/logout')
  },
  getProfile(): Promise<IAdmin> {
    return request.get('/api/auth/profile')
  },
  updateProfile(data: IAdminUpdateRequest): Promise<IAdmin> {
    return request.put('/api/auth/profile', data)
  },
  updatePassword(data: IPasswordUpdateRequest): Promise<void> {
    return request.put('/api/auth/password', data)
  },
}

export const updateProfile = authApi.updateProfile
export const updatePassword = authApi.updatePassword
