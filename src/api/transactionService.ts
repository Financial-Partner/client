import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface GetTransactionResponse {
  transactions: Transaction[];
}

const TRANSACTIONS_STORAGE_KEY = 'user_transactions';

export const transactionService = {
  createTransaction: async (transaction: Transaction) => {
    try {
      const storedTransactions = await AsyncStorage.getItem(
        TRANSACTIONS_STORAGE_KEY,
      );
      const transactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
      };
      transactions.push(newTransaction);
      await AsyncStorage.setItem(
        TRANSACTIONS_STORAGE_KEY,
        JSON.stringify(transactions),
      );
      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  getTransactions: async (): Promise<GetTransactionResponse> => {
    try {
      const storedTransactions = await AsyncStorage.getItem(
        TRANSACTIONS_STORAGE_KEY,
      );
      const transactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];
      return {transactions};
    } catch (error) {
      console.error('Error getting transactions:', error);
      return {transactions: []};
    }
  },
};

export const useTransactions = () => {
  const {data, error, isLoading, mutate} = useSWR<GetTransactionResponse>(
    'mock-transactions',
    () => transactionService.getTransactions(),
  );

  return {
    transactions: data?.transactions || [],
    isLoading,
    isError: error,
    mutate,
  };
};
