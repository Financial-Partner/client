import apiClient from './client';
import {API_ENDPOINTS} from './endpoints';
import useSWR from 'swr';
import {useAuth} from '../contexts/AuthContext';

interface UserProfileResponse {
  id: string;
  email: string;
  name: string;
  character: {
    id: string;
    image_url: string;
  };
  wallet: {
    diamonds: number;
    saving: number;
  };
}

interface SetCharacterRequest {
  character_id: string;
  image_url: string;
}

export const userService = {
  getUserProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.USER_ME);
    return response.data;
  },

  updateUserProfile: async (userData: any) => {
    const response = await apiClient.put(API_ENDPOINTS.USER_UPDATE, userData);
    return response.data;
  },

  setCharacter: async (
    data: SetCharacterRequest,
  ): Promise<UserProfileResponse> => {
    const response = await apiClient.put(API_ENDPOINTS.USER_CHARACTER, data);
    return response.data;
  },
};

export const useUserProfile = () => {
  const {serverToken} = useAuth();
  const {data, error, isLoading, mutate} = useSWR<UserProfileResponse>(
    serverToken ? API_ENDPOINTS.USER_ME : null,
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useUserProfileManager = () => {
  const {user, isLoading, isError, mutate} = useUserProfile();

  const updateProfile = async (userData: any) => {
    try {
      const updatedUser = await userService.updateUserProfile(userData);
      mutate(updatedUser, false);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const setCharacter = async (data: SetCharacterRequest) => {
    try {
      const updatedUser = await userService.setCharacter(data);
      mutate(updatedUser, false);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    isLoading,
    isError,
    updateProfile,
    setCharacter,
  };
};
