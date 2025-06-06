import { getAllCreditHistory } from '@/services/credit-history-service';
import { CreditHistory } from '@/types/credit-history';
import { create } from 'zustand';

interface creditHistoryState {
  loading: boolean;
  creditHistory: any | null;
  fetchAllCreditHistory: () => void;
}

export const useCreditHistoryStore = create<creditHistoryState>((set) => {
  return {
    loading: false,
    creditHistory: null,
    fetchAllCreditHistory: async () => {
      try {
        const response = await getAllCreditHistory();
        set({ creditHistory: response.data.creditHistory, loading: true });
        // console.log('response.data.data', response.data.transactions);
      } catch (error) {
        throw error;
      }
    },
  };
});
