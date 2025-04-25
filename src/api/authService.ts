interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const mockAuthResponse: AuthResponse = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
};

export const authService = {
  exchangeToken: async (_: string): Promise<AuthResponse> => {
    return mockAuthResponse;
  },

  login: async (_: LoginCredentials): Promise<AuthResponse> => {
    return mockAuthResponse;
  },

  register: async (_: any) => {
    return mockAuthResponse;
  },

  logout: async (_: string) => {
    return {success: true};
  },

  refreshToken: async (_: string): Promise<AuthResponse> => {
    return mockAuthResponse;
  },
};
