import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import transactionReducer from './slices/transactionSlice';
import missionReducer from './slices/missionSlice';
import walletReducer from './slices/walletSlice';

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
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
