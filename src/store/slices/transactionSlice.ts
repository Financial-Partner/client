import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';

export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    clearTransactions: state => {
      state.transactions = [];
    },
  },
});

export const {addTransaction, setTransactions, clearTransactions} =
  transactionSlice.actions;

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export default transactionSlice.reducer;
