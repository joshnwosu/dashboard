export interface SubscriptionPayload {
  plan_id: string;
  pay_with_existing_card: boolean;
  change_plan: boolean;
  current_plan_id: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    payment_url: string;
    ref: string;
  };
}

export interface CompanySubscriptionResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    id: number;
    plan_id: string;
    user_id: number;
    company_id: number;
    email: string;
    activation_date: string;
    expiring_date: string;
    status: string;
    credit: string;
    is_free: boolean;
    external_subscription_id: string;
    email_token: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SubscriptionError {
  success: boolean;
  message: string;
  statusCode: number;
}
