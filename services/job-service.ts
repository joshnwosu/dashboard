import apiClient from '@/lib/axios';
import {
  AddCvToJobPayload,
  SourceCandidatePayload,
  SubmitJobDescriptionPayload,
} from '@/types/job';

export const sourceCandidate = async (payload: SourceCandidatePayload) => {
  try {
    const response = await apiClient.post<any>(
      '/jobs/source_candidate',
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCandidates = async (id: string) => {
  try {
    const response = await apiClient.get<any>(`/jobs/jobs_candidates/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCandidate = async (id: string) => {
  try {
    const response = await apiClient.get<any>(`/jobs/candidate/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reQueryJobCandidatesScraping = async (id: string) => {
  try {
    const response = await apiClient.get<any>(
      `/jobs/re_query_job_candidates_scraping/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchHistory = async (
  page: number = 1,
  perPage: number = 15
) => {
  try {
    const response = await apiClient.get<any>('/jobs/search', {
      params: {
        page,
        perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
