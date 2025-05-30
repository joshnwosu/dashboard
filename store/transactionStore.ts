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
  fecthAllTransactions?: () => void;
  fecthDashboardAnalysis: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => {
  return {
    loading: false,
    transactions: null,
    dashboardAnalysis: null,
    fecthAllTransactions: async () => {
      try {
        const response = await getAllTransactions();
        set({ transactions: response.data.data, loading: true });
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
