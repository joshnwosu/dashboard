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

export interface SubscriptionError {
  success: boolean;
  message: string;
  statusCode: number;
}
