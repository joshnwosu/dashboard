import apiClient from '@/lib/axios';
import { CreditHistory } from '@/types/credit-history';

export const getAllCreditHistory = async () => {
  try {
    const response = await apiClient.get<CreditHistory>(
      `/credit_history/company?page=1&perPage=3`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
