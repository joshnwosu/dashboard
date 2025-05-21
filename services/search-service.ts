import apiClient from '@/lib/axios';
import { SourceCandidatePayload } from '@/types/job';

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
    const response = await apiClient.get<any>('/jobs', {
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
