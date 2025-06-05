import { getUserProfile, updateUserProfile } from '@/services/user-service';
import { UserProfile } from '@/types/user';
import { create } from 'zustand';

interface UserState {
  user: UserProfile | null;
  getUserProfile: () => void;
  setUser: (user: UserProfile) => void;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => {
  return {
    user: null,
    getUserProfile: async () => {
      try {
        const response = await getUserProfile();
        set({ user: response.data });
      } catch (error) {
        throw error;
      }
    },
    setUser: (user) => set({ user }),
    updateUserProfile: async (data) => {
      try {
        const response = await updateUserProfile(data);
        set({ user: response.data });
      } catch (error) {
        throw error;
      }
    },
  };
});
