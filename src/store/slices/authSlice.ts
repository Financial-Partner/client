import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  userToken: string | null;
  refreshToken: string | null;
  isDummyToken: boolean;
}

const initialState: AuthState = {
  userToken: null,
  refreshToken: null,
  isDummyToken: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        userToken: string;
        refreshToken: string;
        isDummyToken?: boolean;
      }>,
    ) => {
      state.userToken = action.payload.userToken;
      state.refreshToken = action.payload.refreshToken;
      state.isDummyToken = action.payload.isDummyToken || false;
    },
    clearTokens: state => {
      state.userToken = null;
      state.refreshToken = null;
      state.isDummyToken = false;
    },
  },
});

export const {setTokens, clearTokens} = authSlice.actions;
export default authSlice.reducer;
