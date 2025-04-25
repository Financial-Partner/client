import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

interface UserProfileResponse {
  wallet: {
    diamonds: number;
  };
}

const WALLET_STORAGE_KEY = 'user_wallet';

export const userService = {
  getUserProfile: async (): Promise<UserProfileResponse> => {
    try {
      const storedWallet = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
      return {
        wallet: storedWallet ? JSON.parse(storedWallet) : {diamonds: 0},
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return {wallet: {diamonds: 0}};
    }
  },

  updateDiamonds: async (amount: number): Promise<UserProfileResponse> => {
    try {
      const profile = await userService.getUserProfile();
      const updatedProfile = {
        ...profile,
        wallet: {
          ...profile.wallet,
          diamonds: (profile.wallet?.diamonds || 0) + amount,
        },
      };
      await AsyncStorage.setItem(
        WALLET_STORAGE_KEY,
        JSON.stringify(updatedProfile.wallet),
      );
      return updatedProfile;
    } catch (error) {
      console.error('Error updating diamonds:', error);
      throw error;
    }
  },
};

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      const profile = await userService.getUserProfile();
      setUser(profile);
    };

    loadUserProfile();
  }, []);

  return {user, setUser};
};
