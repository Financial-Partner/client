import {useAppDispatch, useAppSelector} from '../store';
import {transactionSlice, Transaction} from '../store/slices/transactionSlice';

export interface GetTransactionResponse {
  transactions: Transaction[];
}

export const transactionService = {
  createTransaction: async (transaction: Transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    return newTransaction;
  },

  getTransactions: async (): Promise<GetTransactionResponse> => {
    // This will be handled by Redux state
    return {transactions: []};
  },
};

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(state => state.transactions.transactions);

  const addTransaction = async (transaction: Transaction) => {
    const newTransaction = await transactionService.createTransaction(
      transaction,
    );
    dispatch(transactionSlice.actions.addTransaction(newTransaction));
    return newTransaction;
  };

  return {
    transactions,
    addTransaction,
  };
};
