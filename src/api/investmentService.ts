import apiClient from './client';
import {API_ENDPOINTS} from './endpoints';

export interface Investment {
  amount: number;
  description: string;
  date: string;
  category: string;
  transaction_type: 'Income' | 'Expense';
}

interface CreateInvestmentRequest {
  opportunity_id: string;
  amount: number;
}

export interface Opportunity {}

export const transactionService = {
  getOpportunities: async (): Promise<Opportunity[]> => {
    const response = await apiClient.get(API_ENDPOINTS.INVESTMENT);
    return response.data;
  },

  getUserInvestments: async (): Promise<Investment[]> => {
    const response = await apiClient.get(API_ENDPOINTS.USER_INVESTMENT);
    return response.data;
  },

  postUserInvestment: async (investment: CreateInvestmentRequest) => {
    const response = await apiClient.post(
      API_ENDPOINTS.USER_INVESTMENT,
      investment,
    );
    return response.data;
  },
};
