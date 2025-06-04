import { create } from 'zustand';
import {
  createSubscription,
  getActiveSubscription,
  cancelSubscription,
} from '@/services/subscription-service';
import {
  SubscriptionPayload,
  SubscriptionResponse,
} from '@/types/subscription';

interface SubscriptionState {
  activeSubscription: SubscriptionResponse | null;
  loading: boolean;
  error: string | null;
  createSubscription: (
    payload: SubscriptionPayload
  ) => Promise<SubscriptionResponse>;
  fetchActiveSubscription: (id: string) => Promise<void>;
  cancelSubscription: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  activeSubscription: null,
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
      const data = await getActiveSubscription(id);
      set({ activeSubscription: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch active subscription',
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
