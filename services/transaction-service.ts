import apiClient from '@/lib/axios';
import { DashboardAnalysisData } from '@/types/transaction';

export const getAllTransactions = async () => {
  try {
    const response = await apiClient.get<any>(`/transactions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardAnalysis = async () => {
  try {
    const response = await apiClient.get<any>(`/transactions/dashboard`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
