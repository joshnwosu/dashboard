import apiClient from '@/lib/axios';
import { LoginResponse, RegisterPayload } from '@/types/auth';

export const register = async (payload: RegisterPayload) => {
  try {
    const response = await apiClient.post<any>('/auth/register/', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse | undefined> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    const { access_token } = response.data.data;
    localStorage.setItem('access_token', access_token); // Store the token
    return response.data;
  } catch (error) {
    throw error;
    // console.error('Login failed:', error);
  }
};

export const logout = async () => {
  localStorage.removeItem('access_token');
  window.location.href = '/login'; // Redirect to login
};
