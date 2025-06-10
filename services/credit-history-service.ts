import apiClient from '@/lib/axios';
import { CreditHistory } from '@/types/credit-history';

export const getAllCreditHistory = async (
  page: number = 1,
  perPage: number = 10
) => {
  try {
    const response = await apiClient.get<CreditHistory>(
      `/credit_history/company`,
      {
        params: {
          page,
          perPage,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
