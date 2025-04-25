import apiClient from './client';
import {API_ENDPOINTS} from './endpoints';
// import useSWR from 'swr';
// import {useAuth} from '../contexts/AuthContext';

export interface Transaction {
  amount: number;
  description: string;
  date: string;
  category: string;
  transaction_type: 'Income' | 'Expense';
}

interface GetTransactionResponse {
  transactions: Transaction[];
}

export const transactionService = {
  createTransaction: async (transaction: Transaction) => {
    const response = await apiClient.post(
      API_ENDPOINTS.TRANSACTION,
      transaction,
    );
    return response.data;
  },

  getTransactions: async (): Promise<GetTransactionResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSACTION);
    return response.data;
  },
};
