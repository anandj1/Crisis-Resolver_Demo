import { create } from 'zustand';
import { AuthState, LoginFormData, RegisterFormData } from '../types/auth';
import { authService } from '../services/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const { user, token } = await authService.login({ email, password });
    set({ user, isAuthenticated: true });
  },

  register: async (email: string, password: string, name: string) => {
    const { user, token } = await authService.register({ email, password, name, confirmPassword: password });
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));