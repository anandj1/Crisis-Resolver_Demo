import api from './api';
import type { LoginFormData, RegisterFormData, User } from '../types/auth';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};