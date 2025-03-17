import apiClient from './client';
import {API_ENDPOINTS} from './endpoints';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const authService = {
  exchangeToken: async (firebaseToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, {
      firebase_token: firebaseToken,
    });
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials,
    );
    return response.data;
  },

  register: async (userData: any) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH_REGISTER,
      userData,
    );
    return response.data;
  },

  logout: async (refreshToken: string) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT, {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH_REFRESH, {
      refresh_token: refreshToken,
    });
    return response.data;
  },
};
