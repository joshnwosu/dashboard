import { create } from 'zustand';

interface TransactionState {
  showPricingToggle: boolean;
  setShowPricingToggle: (show: boolean) => void;
}

export const useAppStore = create<TransactionState>((set) => {
  return {
    showPricingToggle: false,

    setShowPricingToggle: (show: boolean) => {
      set({ showPricingToggle: show });
    },
  };
});
