import apiClient from '@/lib/axios';
import {
  CompanySubscriptionResponse,
  SubscriptionPayload,
  SubscriptionResponse,
} from '@/types/subscription';

export const createSubscription = async (payload: SubscriptionPayload) => {
  try {
    const response = await apiClient.post<SubscriptionResponse>(
      '/subscriptions',
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateSubscription = async (id: string) => {
  try {
    const response = await apiClient.put<SubscriptionResponse>(
      `/subscriptions/${id}/activate`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelSubscription = async (id: string) => {
  try {
    const response = await apiClient.put<SubscriptionResponse>(
      `/subscriptions/${id}/cancel`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanySubscription = async () => {
  try {
    const response = await apiClient.get<CompanySubscriptionResponse>(
      `subscriptions/get_company_subscription`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
