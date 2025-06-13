import apiClient from '@/lib/axios';
import {
  ChangePasswordPayload,
  LoginResponse,
  RegisterPayload,
  ResetPasswordPayload,
  CompleteGoogleSignupPayload,
  SendOtpPayload,
  VerifyOtpPayload,
  WaitlistResponse,
} from '@/types/auth';

export const register = async (payload: RegisterPayload) => {
  try {
    const response = await apiClient.post<any>(
      '/auth/register_with_email',
      payload
    );
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

    // Set cookie for server-side middleware
    document.cookie = `access_token=${access_token}; path=/; SameSite=Strict`;
    return response.data;
  } catch (error) {
    throw error;
    // console.error('Login failed:', error);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('access_token');
    // Clear cookie
    document.cookie =
      'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    window.location.href = '/auth/login'; // Redirect to login
  } catch (error) {
    console.error('Logout failed:', error);
    // Redirect even if API call fails
    window.location.href = '/auth/login';
  }
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  try {
    const response = await apiClient.post<any>(
      '/user/change_password',
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  try {
    const response = await apiClient.post<any>('/auth/reset_password', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleGoogleCallback = async (code: string) => {
  try {
    const response = await apiClient.get<LoginResponse>(
      `/auth/google/callback?code=${code}`
    );
    const { access_token } = response.data.data;
    localStorage.setItem('access_token', access_token);
    document.cookie = `access_token=${access_token}; path=/; SameSite=Strict`;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeGoogleSignup = async (
  payload: CompleteGoogleSignupPayload
) => {
  try {
    const response = await apiClient.post<LoginResponse>(
      '/auth/complete_gmail_signup',
      payload
    );
    const { access_token } = response.data.data;
    localStorage.setItem('access_token', access_token);
    document.cookie = `access_token=${access_token}; path=/; SameSite=Strict`;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendOtp = async (payload: SendOtpPayload) => {
  try {
    const response = await apiClient.post<any>('/auth/send_otp', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  try {
    const response = await apiClient.post<any>('/auth/verify_email', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkWaitlist = async (email: string) => {
  try {
    const response = await apiClient.get<WaitlistResponse>(
      `/user/waitlist?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
