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

export const getCandidate = async (id: number) => {
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
  perPage: number = 10
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

export const getCvScreening = async (
  page: number = 1,
  perPage: number = 10
) => {
  try {
    const response = await apiClient.get<any>('/jobs/cv_screening', {
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

// New shortlist endpoints
export const addCandidateToShortlist = async (id: number) => {
  try {
    const response = await apiClient.put<any>(
      `/jobs/add_candidate_to_shortlist/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShortlistCandidate = async (id: number) => {
  try {
    const response = await apiClient.get<any>(
      `/jobs/get_shortlist_candidate/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllShortlistCandidates = async () => {
  try {
    const response = await apiClient.get<any>('/jobs/get_shortlist_candidate');
    return response.data;
  } catch (error) {
    throw error;
  }
};
