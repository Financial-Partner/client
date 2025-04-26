import {mockInvestments, mockInvestmentOpportunities} from '../mock/data';
import useSWR from 'swr';

export interface Investment {
  id: string;
  name: string;
  amount: number;
  returnRate: number;
  riskLevel: string;
  status: string;
}

export interface Opportunity {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  expectedReturn: number;
  riskLevel: string;
}

export interface CreateInvestmentRequest {
  opportunityId: string;
  amount: number;
}

export const investmentService = {
  getOpportunities: async (): Promise<Opportunity[]> => {
    return mockInvestmentOpportunities;
  },

  getUserInvestments: async (): Promise<Investment[]> => {
    return mockInvestments;
  },

  postUserInvestment: async (investment: CreateInvestmentRequest) => {
    const opportunity = mockInvestmentOpportunities.find(
      o => o.id === investment.opportunityId,
    );
    if (!opportunity) {
      throw new Error('Opportunity not found');
    }
    const newInvestment: Investment = {
      id: (mockInvestments.length + 1).toString(),
      name: opportunity.name,
      amount: investment.amount,
      returnRate: opportunity.expectedReturn,
      riskLevel: opportunity.riskLevel,
      status: 'ACTIVE',
    };
    mockInvestments.push(newInvestment);
    return newInvestment;
  },
};

export const useInvestments = () => {
  const {data, error, isLoading, mutate} = useSWR<Investment[]>(
    'mock-investments',
    () => investmentService.getUserInvestments(),
  );

  return {
    investments: data || [],
    isLoading,
    isError: error,
    mutate,
  };
};

export const useInvestmentOpportunities = () => {
  const {data, error, isLoading} = useSWR<Opportunity[]>(
    'mock-investment-opportunities',
    () => investmentService.getOpportunities(),
  );

  return {
    opportunities: data || [],
    isLoading,
    isError: error,
  };
};
