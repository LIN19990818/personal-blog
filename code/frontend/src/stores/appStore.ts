import { create } from 'zustand'

interface IAppState {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const useAppStore = create<IAppState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}))

export default useAppStore
