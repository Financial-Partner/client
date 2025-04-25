import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {API_ENDPOINTS} from './endpoints';

const API_BASE_URL = Config.API_BASE_URL || 'http://localhost:8080/api';
const SKIP_AUTH = Config.SKIP_AUTH === 'true';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userToken');
    if (
      token &&
      !config.url?.includes(API_ENDPOINTS.AUTH_LOGIN) &&
      !config.url?.includes(API_ENDPOINTS.AUTH_REGISTER)
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    if (SKIP_AUTH) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          `${API_BASE_URL}${API_ENDPOINTS.AUTH_REFRESH}`,
          {
            refresh_token: refreshToken,
          },
        );

        const {access_token, refresh_token} = response.data;

        await AsyncStorage.setItem('userToken', access_token);
        await AsyncStorage.setItem('refreshToken', refresh_token);

        apiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('isDummyToken');

        console.error('Token refresh failed, user needs to login again');

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
