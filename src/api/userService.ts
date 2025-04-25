import {mockUserProfile} from '../mock/data';
import useSWR from 'swr';
import {useAuth} from '../contexts/AuthContext';

interface UserProfileResponse {
  wallet: {
    diamonds: number;
    saving: number;
  };
}

export const userService = {
  getUserProfile: async (): Promise<UserProfileResponse> => {
    return mockUserProfile;
  },

  updateUserProfile: async (userData: any) => {
    return {...mockUserProfile, ...userData};
  },
};

export const useUserProfile = () => {
  const {serverToken} = useAuth();
  const {data, error, isLoading, mutate} = useSWR<UserProfileResponse>(
    serverToken ? 'mock-user-profile' : null,
    () => userService.getUserProfile(),
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

  return {
    user,
    isLoading,
    isError,
    updateProfile,
  };
};
