import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';
import { User, LoginData, RegisterData, AuthResponse, UpdateProfileData } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);
    console.log(formData)
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, formData,{headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }});
      localStorage.setItem('token', response.data.access_token);
      set({ 
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/auth/register`, data);
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ 
      user: null,
      isAuthenticated: false 
    });
  },

  getMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<User>(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      set({ 
        user: response.data,
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<User>(
        `${API_URL}/users/me`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      set({ 
        user: response.data,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  }
}));