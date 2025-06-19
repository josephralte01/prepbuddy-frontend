// 📁 src/store/useAuthStore.ts

import { create } from 'zustand';
import axios from '@/lib/axios';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      await get().fetchUser();
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await axios.post('/api/auth/logout');
    set({ user: null, isLoggedIn: false });
  },

  fetchUser: async () => {
    try {
      const res = await axios.get('/api/auth/me');
      set({ user: res.data.user, isLoggedIn: true });
    } catch {
      set({ user: null, isLoggedIn: false });
    }
  }
}));

export default useAuthStore;
