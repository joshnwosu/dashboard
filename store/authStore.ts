import { RegisterPayload, WaitlistUser } from '@/types/auth';
import { create } from 'zustand';

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  registerData: any;
  resetPasswordEmail: string | null;
  resetPasswordOtp: string | null;
  waitlistUser: WaitlistUser | null;
  isOnWaitlist: boolean;
  setRegisterData: (data: any) => void;
  setResetPasswordEmail: (email: string | null) => void;
  setResetPasswordOtp: (otp: string | null) => void;
  setWaitlistUser: (user: WaitlistUser | null) => void;
  clearResetPasswordData: () => void;
  clearWaitlistData: () => void;
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
    resetPasswordEmail: null,
    resetPasswordOtp: null,
    waitlistUser: null,
    isOnWaitlist: false,

    setRegisterData: (data) => {
      set((state) => {
        const updatedData = { ...state.registerData, ...data };
        if (isBrowser) {
          localStorage.setItem('registerData', JSON.stringify(updatedData));
        }
        return { registerData: updatedData };
      });
    },

    setResetPasswordEmail: (email) => {
      set({ resetPasswordEmail: email });
    },

    setResetPasswordOtp: (otp) => {
      set({ resetPasswordOtp: otp });
    },

    setWaitlistUser: (user) => {
      set({
        waitlistUser: user,
        isOnWaitlist: !!user,
      });
    },

    clearResetPasswordData: () => {
      set({ resetPasswordEmail: null, resetPasswordOtp: null });
    },

    clearWaitlistData: () => {
      set({ waitlistUser: null, isOnWaitlist: false });
    },
  };
});
