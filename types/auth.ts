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
      email_verify: string | null;
      phone_number_verify: string | null;
      country: string;
      active: boolean;
      admin: boolean;
    };
    access_token: string;
  };
}
