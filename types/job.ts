export interface SourceCandidatePayload {
  job_description: string;
  search_github: boolean;
  search_linkedin: boolean;
  search_indeed: boolean;
}

export interface SubmitJobDescriptionPayload {
  job_description: string;
}

export interface AddCvToJobPayload {
  job_id: number;
  cv_description: string;
}
