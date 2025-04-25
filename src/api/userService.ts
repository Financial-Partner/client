import {mockUserProfile} from '../mock/data';
import useSWR from 'swr';
import {useAuth} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfileResponse {
  wallet: {
    diamonds: number;
    saving: number;
  };
}

const WALLET_STORAGE_KEY = 'user_wallet';

export const userService = {
  getUserProfile: async (): Promise<UserProfileResponse> => {
    try {
      const storedWallet = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
      if (storedWallet) {
        return {
          ...mockUserProfile,
          wallet: JSON.parse(storedWallet),
        };
      }
      // If no stored wallet, initialize with default values
      await AsyncStorage.setItem(
        WALLET_STORAGE_KEY,
        JSON.stringify(mockUserProfile.wallet),
      );
      return mockUserProfile;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return mockUserProfile;
    }
  },

  updateUserProfile: async (userData: Partial<UserProfileResponse>) => {
    try {
      if (userData.wallet) {
        await AsyncStorage.setItem(
          WALLET_STORAGE_KEY,
          JSON.stringify(userData.wallet),
        );
      }
      return {
        ...mockUserProfile,
        ...userData,
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
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

  const updateProfile = async (userData: Partial<UserProfileResponse>) => {
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
