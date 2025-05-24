// types/cv-screening.ts
export interface SubmitJobDescriptionPayload {
  job_description: string;
}

export interface AddCvToJobPayload {
  job_id: string;
  cv_file: File;
}

export interface CVScreeningItem {
  id: string;
  candidate_name: string;
  cv_file_url: string;
  job_id: string;
  score?: number;
  status: 'pending' | 'analyzed' | 'error';
  uploaded_at: string;
}

export interface CVScreeningResponse {
  data: CVScreeningItem[];
  total: number;
  page: number;
  perPage: number;
}
