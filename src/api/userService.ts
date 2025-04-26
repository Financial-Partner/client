import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {settingsSlice} from '../store/slices/settingsSlice';

interface UserProfileResponse {
  wallet: {
    diamonds: number;
  };
}

export const userService = {
  getUserProfile: async (): Promise<UserProfileResponse> => {
    const store = require('../store').store;
    const state = store.getState();
    return {
      wallet: {
        diamonds: state.settings.diamonds,
      },
    };
  },

  updateDiamonds: async (amount: number): Promise<UserProfileResponse> => {
    const store = require('../store').store;
    const state = store.getState();
    return {
      wallet: {
        diamonds: state.settings.diamonds + amount,
      },
    };
  },
};

export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const diamonds = useAppSelector(state => state.settings.diamonds);
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      const profile = await userService.getUserProfile();
      setUser(profile);
    };

    loadUserProfile();
  }, [diamonds]);

  const updateDiamonds = async (amount: number) => {
    try {
      dispatch(settingsSlice.actions.addDiamonds(amount));
      const updatedProfile = await userService.updateDiamonds(amount);
      setUser(updatedProfile);
    } catch (error) {
      console.error('Error updating diamonds:', error);
    }
  };

  return {user, setUser, diamonds, updateDiamonds};
};
