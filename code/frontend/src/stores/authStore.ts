import { create } from 'zustand'
import { IAdmin, ILoginRequest, ILoginResponse } from '@/types'
import { storage } from '@/utils'
import request from '@/utils/request'

interface IAuthState {
  token: string | null
  admin: IAdmin | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: ILoginRequest) => Promise<void>
  logout: () => void
  setAdmin: (admin: IAdmin) => void
}

const useAuthStore = create<IAuthState>((set, get) => ({
  token: storage.getToken(),
  admin: storage.getAdmin() ? JSON.parse(storage.getAdmin()!) : null,
  isAuthenticated: !!storage.getToken(),
  loading: false,
  login: async (data: ILoginRequest) => {
    set({ loading: true })
    try {
      const res: ILoginResponse = await request.post('/api/auth/login', data)
      storage.setToken(res.token)
      storage.setAdmin(JSON.stringify(res.admin))
      set({ 
        token: res.token, 
        admin: res.admin, 
        isAuthenticated: true,
        loading: false 
      })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  logout: () => {
    storage.clear()
    set({ token: null, admin: null, isAuthenticated: false })
  },
  setAdmin: (admin: IAdmin) => {
    storage.setAdmin(JSON.stringify(admin))
    set({ admin })
  },
}))

export default useAuthStore
export { useAuthStore }
