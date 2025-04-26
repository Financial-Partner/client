let mockUserProfile = {
  wallet: {
    diamonds: 5000,
    saving: 50000,
  },
};

export const updateMockUserProfile = (
  updates: Partial<typeof mockUserProfile>,
) => {
  mockUserProfile = {
    ...mockUserProfile,
    ...updates,
  };
  return mockUserProfile;
};

export {mockUserProfile};

export const mockInvestments = [
  {
    id: '1',
    name: 'Tech Fund',
    amount: 10000,
    returnRate: 0.15,
    riskLevel: 'MEDIUM',
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Green Energy',
    amount: 5000,
    returnRate: 0.12,
    riskLevel: 'LOW',
    status: 'ACTIVE',
  },
];

export const mockInvestmentOpportunities = [
  {
    id: '1',
    name: 'AI Technology Fund',
    description: 'Investment in artificial intelligence companies',
    minAmount: 1000,
    expectedReturn: 0.18,
    riskLevel: 'HIGH',
  },
  {
    id: '2',
    name: 'Healthcare Fund',
    description: 'Investment in healthcare and biotechnology',
    minAmount: 500,
    expectedReturn: 0.12,
    riskLevel: 'MEDIUM',
  },
];
