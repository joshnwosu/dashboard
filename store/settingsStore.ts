import { create } from 'zustand';

interface SettingsState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
