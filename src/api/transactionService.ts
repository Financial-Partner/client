import {mockTransactions} from '../mock/data';
import useSWR from 'swr';

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

export const transactionService = {
  createTransaction: async (transaction: Transaction) => {
    const newTransaction = {
      ...transaction,
      id: (mockTransactions.length + 1).toString(),
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  getTransactions: async (): Promise<GetTransactionResponse> => {
    return {transactions: mockTransactions};
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
