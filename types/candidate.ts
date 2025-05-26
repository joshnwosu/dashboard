export interface Candidate {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  linkedin_url: string;
  profile_url: string;
  github_url: string;
  indeed_url: string;
  x_url: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  website: string;
  shortlist: boolean;
  email_sent: boolean;
  inerview_booked: boolean;
  job_id: string;
  company_id: string;
  user_id: string;
  last_profile_sync: string;
  platform: string;
  profile_pic_url: string;
  country: string;
  summary: string;
  current_role: string;
  timezone: string;
  talent_score: string;
  overall_recommendation: string;
  justification: string;
  createdAt: string;
  updatedAt: string;
  interview_booked: boolean;

  jobTitle: string;
  company: string;
}
