// src/store/authStore.ts
import { create } from 'zustand'

type User = {
  name: string
  email: string
  token: string
  role: 'user' | 'admin'
}

interface AuthStore {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}))
