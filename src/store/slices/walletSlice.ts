import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface WalletState {
  balance: number;
  lastUpdated: string | null;
}

const initialState: WalletState = {
  balance: 0,
  lastUpdated: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    clearWallet: state => {
      state.balance = 0;
      state.lastUpdated = null;
    },
  },
});

export const {setWalletBalance, updateBalance, clearWallet} =
  walletSlice.actions;
export default walletSlice.reducer;
