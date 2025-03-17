import {API_ENDPOINTS} from './endpoints';

import {apiClient, useApiMutation} from '.';
import useSWR from 'swr';

interface UserProfileResponse {
  wallet: {
    diamonds: number;
    saving: number;
  };
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
};

export const useUserProfile = () => {
  const {data, error, isLoading, mutate} = useSWR<UserProfileResponse>(
    API_ENDPOINTS.USER_ME,
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
  const {put} = useApiMutation();

  const updateProfile = async (userData: any) => {
    try {
      const updatedUser = await put(API_ENDPOINTS.USER_UPDATE, userData);
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
  };
};
