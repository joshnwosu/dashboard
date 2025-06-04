import {
  getAllTransactions,
  getDashboardAnalysis,
} from '@/services/transaction-service';
import { DashboardAnalysisData } from '@/types/transaction';
import { create } from 'zustand';

interface TransactionState {
  loading: boolean;
  transactions: any | null;
  dashboardAnalysis: DashboardAnalysisData | null;
  fetchAllTransactions: () => void;
  fecthDashboardAnalysis: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => {
  return {
    loading: false,
    transactions: null,
    dashboardAnalysis: null,
    fetchAllTransactions: async () => {
      try {
        const response = await getAllTransactions();
        set({ transactions: response.data.transactions, loading: true });
        // console.log('response.data.data', response.data.transactions);
      } catch (error) {
        throw error;
      }
    },
    fecthDashboardAnalysis: async () => {
      try {
        const response = await getDashboardAnalysis();
        set({ dashboardAnalysis: response.data, loading: true });
      } catch (error) {
        throw error;
      }
    },
  };
});
