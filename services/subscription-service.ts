import apiClient from '@/lib/axios';
import {
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

export const getActiveSubscription = async (id: string) => {
  try {
    const response = await apiClient.get<SubscriptionResponse>(
      `/subscriptions/${id}/activate`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelSubscription = async (id: string) => {
  try {
    const response = await apiClient.post<SubscriptionResponse>(
      `/subscriptions/${id}/cancel`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
