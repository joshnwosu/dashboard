import { create } from 'zustand';
import {
  sourceCandidate,
  getAllCandidates,
  getCandidate,
  reQueryJobCandidatesScraping,
  getSearchHistory,
  submitJobDescription,
  addCvToJob,
  getCvScreening,
  addCandidateToShortlist,
  getShortlistCandidate,
  getAllShortlistCandidates,
} from '@/services/job-service';
import {
  SourceCandidatePayload,
  SubmitJobDescriptionPayload,
  AddCvToJobPayload,
} from '@/types/job';
import { CandidateData } from '@/types/candidate';

interface Candidate {
  id: string;
  [key: string]: any; // Adjust based on actual candidate data structure
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  company_id: string;
  user_id: string;
  active: boolean;
  view: number;
  applied: number;
  hired: boolean;
  job_summary: {
    job_title: string;
    github_search_query: string;
    linkedin_search_query: string;
  };
  search_github: boolean;
  search_linkedin: boolean;
  search_indeed: boolean;
  search_cv: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SearchHistory {
  jobs: SearchItem[]; // Adjust based on actual job data structure
  total: number;
  page: number;
  lastPage: number;
}

interface JobState {
  candidates: any | Candidate[];
  selectedCandidate: CandidateData | null;
  searchHistory: SearchHistory | null;
  cvScreeningHistory: SearchHistory | null; // Adjust based on actual CV screening data structure
  shortlistedCandidates: any[]; // Add shortlist state
  selectedShortlistCandidate: any | null;
  loading: boolean;
  fetchingCandidate: boolean;
  error: string | null;
  sourceCandidate: (payload: SourceCandidatePayload) => Promise<void>;
  fetchAllCandidates: (jobId: string) => Promise<void>;
  fetchCandidate: (candidateId: number) => Promise<void>;
  reQueryJobCandidates: (jobId: string) => Promise<void>;
  fetchSearchHistory: (page?: number, perPage?: number) => Promise<void>;
  submitJobDescription: (payload: SubmitJobDescriptionPayload) => Promise<void>;
  addCvToJob: (payload: AddCvToJobPayload) => Promise<void>;
  fetchCvScreeningHistory: (page?: number, perPage?: number) => Promise<void>;
  addToShortlist: (candidateId: number) => Promise<void>;
  fetchShortlistCandidate: (candidateId: number) => Promise<void>;
  fetchAllShortlistCandidates: () => Promise<void>;
  clearError: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  candidates: [],
  selectedCandidate: null,
  searchHistory: null,
  cvScreeningHistory: null,
  shortlistedCandidates: [],
  selectedShortlistCandidate: null,
  loading: false,
  fetchingCandidate: false,
  error: null,

  sourceCandidate: async (payload: SourceCandidatePayload) => {
    set({ loading: true, error: null });
    try {
      const data = await sourceCandidate(payload);
      set({ loading: false });
      return data.data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to source candidate',
      });
      throw error;
    }
  },

  fetchAllCandidates: async (jobId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getAllCandidates(jobId);
      set({ candidates: data.data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch candidates',
      });
      throw error;
    }
  },

  fetchCandidate: async (candidateId: number) => {
    set({ fetchingCandidate: true, error: null });
    try {
      const data = await getCandidate(candidateId);
      set({ selectedCandidate: data.data, fetchingCandidate: false });
    } catch (error: any) {
      set({
        fetchingCandidate: false,
        error: error.message || 'Failed to fetch candidate',
      });
      throw error;
    }
  },

  reQueryJobCandidates: async (jobId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await reQueryJobCandidatesScraping(jobId);
      set({ candidates: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to re-query candidates',
      });
      throw error;
    }
  },

  fetchSearchHistory: async (page: number = 1, perPage: number = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await getSearchHistory(page, perPage);
      set({
        searchHistory: data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch search history',
      });
      throw error;
    }
  },

  submitJobDescription: async (payload: SubmitJobDescriptionPayload) => {
    set({ loading: true, error: null });
    try {
      const data = await submitJobDescription(payload);
      set({ loading: false });
      return data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to submit job description',
      });
      throw error;
    }
  },

  addCvToJob: async (payload: AddCvToJobPayload) => {
    set({ loading: true, error: null });
    try {
      const data = await addCvToJob(payload);
      set({ loading: false });
      return data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to add CV to job',
      });
      throw error;
    }
  },

  fetchCvScreeningHistory: async (page: number = 1, perPage: number = 1) => {
    set({ loading: true, error: null });
    try {
      const data = await getCvScreening(page, perPage);
      set({ cvScreeningHistory: data.data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch CV screening data',
      });
      throw error;
    }
  },

  // New shortlist methods
  addToShortlist: async (candidateId: number) => {
    set({ loading: true, error: null });
    try {
      const data = await addCandidateToShortlist(candidateId);
      set({ loading: false });
      return data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to add candidate to shortlist',
      });
      throw error;
    }
  },

  fetchShortlistCandidate: async (candidateId: number) => {
    set({ loading: true, error: null });
    try {
      const data = await getShortlistCandidate(candidateId);
      set({ selectedShortlistCandidate: data.data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch shortlist candidate',
      });
      throw error;
    }
  },

  fetchAllShortlistCandidates: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllShortlistCandidates();
      set({ shortlistedCandidates: data.data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch shortlisted candidates',
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
