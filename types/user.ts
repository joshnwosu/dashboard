export interface UserProfile {
  user_id: number;
  company_id: number;
  email: string;
  company_name: string;
  name: string;
  phone_number: string;
  email_verify: boolean;
  phone_number_verify: boolean;
  country: string;
  active: boolean;
  admin: boolean;
  iat: number;
  exp: number;
  avatar_url?: string;
  plan?: string;
}
