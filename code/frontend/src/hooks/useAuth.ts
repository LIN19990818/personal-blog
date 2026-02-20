import { useEffect, useState } from 'react'
import useAuthStore from '@/stores/authStore'
import { authApi } from '@/api'

export const useAuth = () => {
  const { token, admin, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !admin) {
        setLoading(true)
        try {
          const profile = await authApi.getProfile()
          setAuth(token, profile)
        } catch {
          clearAuth()
        } finally {
          setLoading(false)
        }
      }
    }
    checkAuth()
  }, [token, admin, setAuth, clearAuth])

  return {
    token,
    admin,
    isAuthenticated,
    loading,
    setAuth,
    clearAuth,
  }
}
