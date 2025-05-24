// services/cv-service.ts
import apiClient from '@/lib/axios';
import {
  AddCvToJobPayload,
  SubmitJobDescriptionPayload,
} from '@/types/cv-screening';

// Updated services/job-service.ts (add the missing types)
export const submitJobDescription = async (
  payload: SubmitJobDescriptionPayload
) => {
  try {
    const response = await apiClient.post<any>(
      '/jobs/submit_job_description',
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCvToJob = async (payload: AddCvToJobPayload) => {
  try {
    const response = await apiClient.post<any>('/jobs/add_cv_to_job', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCvScreening = async () => {
  try {
    const response = await apiClient.get<any>(
      '/jobs/cv_screening?page=1&perPage=15'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
