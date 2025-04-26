import {configureStore, Middleware} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import transactionReducer from './slices/transactionSlice';
import missionReducer from './slices/missionSlice';
import walletReducer from './slices/walletSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Middleware to save settings to AsyncStorage
const saveSettingsMiddleware: Middleware = () => next => (action: unknown) => {
  const result = next(action);

  // Save settings to AsyncStorage whenever they change
  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof action.type === 'string' &&
    action.type.startsWith('settings/')
  ) {
    const state = store.getState();
    const settings = state.settings;
    AsyncStorage.setItem('userData', JSON.stringify(settings));
  }

  return result;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    settings: settingsReducer,
    transactions: transactionReducer,
    missions: missionReducer,
    wallet: walletReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saveSettingsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
