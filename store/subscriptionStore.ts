import { create } from 'zustand';
import {
  createSubscription,
  activateSubscription,
  cancelSubscription,
  getCompanySubscription,
} from '@/services/subscription-service';
import {
  CompanySubscriptionResponse,
  SubscriptionPayload,
  SubscriptionResponse,
} from '@/types/subscription';

interface SubscriptionState {
  activeSubscription: SubscriptionResponse | null;
  companySubscription: CompanySubscriptionResponse | null;
  loading: boolean;
  error: string | null;
  createSubscription: (
    payload: SubscriptionPayload
  ) => Promise<SubscriptionResponse>;
  fetchActiveSubscription: (id: string) => Promise<void>;
  fetchCompanySubscription: () => Promise<void>;
  cancelSubscription: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  activeSubscription: null,
  companySubscription: null,
  loading: false,
  error: null,

  createSubscription: async (payload: SubscriptionPayload) => {
    set({ loading: true, error: null });
    try {
      const data = await createSubscription(payload);
      set({ loading: false });
      return data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to create subscription',
      });
      throw error;
    }
  },

  fetchActiveSubscription: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await activateSubscription(id);
      set({ activeSubscription: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch active subscription',
      });
      throw error;
    }
  },

  fetchCompanySubscription: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getCompanySubscription();
      set({ companySubscription: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch company subscription',
      });
      throw error;
    }
  },

  cancelSubscription: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await cancelSubscription(id);
      set({ activeSubscription: null, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to cancel subscription',
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
