import apiClient from '@/lib/axios';
import { UserProfile } from '@/types/user';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data: Partial<UserProfile>) => {
  try {
    const response = await apiClient.put('/user/update_profile', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
