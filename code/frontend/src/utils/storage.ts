const TOKEN_KEY = 'token'
const ADMIN_KEY = 'admin'

export const storage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },
  getAdmin(): string | null {
    return localStorage.getItem(ADMIN_KEY)
  },
  setAdmin(admin: string): void {
    localStorage.setItem(ADMIN_KEY, admin)
  },
  removeAdmin(): void {
    localStorage.removeItem(ADMIN_KEY)
  },
  clear(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)
  },
}
