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
    return {
      wallet: {
        diamonds: 5000,
      },
    };
  },

  updateDiamonds: async (amount: number): Promise<UserProfileResponse> => {
    return {
      wallet: {
        diamonds: amount,
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
      dispatch(settingsSlice.actions.setDiamonds(profile.wallet.diamonds));
    };

    loadUserProfile();
  }, [dispatch]);

  const updateDiamonds = async (amount: number) => {
    try {
      dispatch(settingsSlice.actions.addDiamonds(amount));
      const updatedProfile = await userService.updateDiamonds(
        diamonds + amount,
      );
      setUser(updatedProfile);
    } catch (error) {
      console.error('Error updating diamonds:', error);
    }
  };

  return {user, setUser, diamonds, updateDiamonds};
};
