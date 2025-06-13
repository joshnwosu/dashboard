export interface RegisterPayload {
  name: string;
  company_name: string;
  phone_number: string;
  country: string;
  email: string;
  password: string;
  reg_channel?: string;
  user_type?: string;
}

// login response interface
export interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    user: {
      user_id: number;
      company_id: number;
      email: string;
      company_name: string;
      name: string;
      phone_number: string | null;
      email_verify: boolean | null;
      phone_number_verify: boolean | null;
      country: string;
      active: boolean;
      admin: boolean;
    };
    access_token: string;
  };
}

// Interface for password-related payloads (adjust as needed)
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordPayload {
  otp: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CompleteGoogleSignupPayload {
  name: string;
  company_name: string;
  phone_number: string;
  country: string;
  email: string; // This will be pre-filled from Google data
  reg_channel: 'google';
  user_type?: string;
  request_id: string; // Added for Google OAuth flow
}

export interface SendOtpPayload {
  email: string;
  type: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

// Type for waitlist user data
export interface WaitlistUser {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  country_code: string;
  company_name: string;
  reg_channel: string;
  created_at: string;
  updated_at: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    success: boolean;
    response_message: string;
    response_code: string;
    data: WaitlistUser;
  };
}
