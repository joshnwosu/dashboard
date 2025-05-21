import apiClient from '@/lib/axios';
import { UserProfile } from '@/types/user';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiClient.get<UserProfile>('/auth/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};
