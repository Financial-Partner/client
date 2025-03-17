import React from 'react';
import {SWRConfig} from 'swr';
import apiClient from './client';

const fetcher = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SWRProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        dedupingInterval: 5000,
      }}>
      {children}
    </SWRConfig>
  );
};

export const useApiMutation = () => {
  const post = async (url: string, data: any) => {
    const response = await apiClient.post(url, data);
    return response.data;
  };

  const put = async (url: string, data: any) => {
    const response = await apiClient.put(url, data);
    return response.data;
  };

  const del = async (url: string) => {
    const response = await apiClient.delete(url);
    return response.data;
  };

  return {post, put, del};
};
