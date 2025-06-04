import { RegisterPayload } from '@/types/auth';
import { create } from 'zustand';

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  registerData: any;
  setRegisterData: (data: any) => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const isBrowser = typeof window !== 'undefined';
  const savedData = isBrowser
    ? JSON.parse(localStorage.getItem('registerData') || '{}')
    : {};

  return {
    user: null,
    accessToken: isBrowser ? localStorage.getItem('access_token') : null,
    isAuthenticated: isBrowser ? !!localStorage.getItem('access_token') : false,
    securityQuestions: null,
    registerData: savedData as RegisterPayload,

    setRegisterData: (data) => {
      set((state) => {
        const updatedData = { ...state.registerData, ...data };
        if (isBrowser) {
          localStorage.setItem('registerData', JSON.stringify(updatedData));
        }
        return { registerData: updatedData };
      });
    },
  };
});
