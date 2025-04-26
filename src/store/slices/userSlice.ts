import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  userData: {
    id?: string;
    email?: string;
    name?: string;
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['userData']>) => {
      state.userData = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: state => {
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
