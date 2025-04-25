import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
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

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    clearTransactions: state => {
      state.transactions = [];
    },
  },
});

export const {setTransactions, addTransaction, clearTransactions} =
  transactionSlice.actions;
export default transactionSlice.reducer;
