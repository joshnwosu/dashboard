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

export interface CandidateData {
  id: number;
  name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  github_url: string;
  profile_pic_url: string | null;
  country: string | null;
  timezone: string;
  talent_score: string;
  overall_recommendation: string;
  justification: string;
  cv_score_result: {
    candidates: {
      profile_info: {
        nationality: string;
        timezone: string;
      };
      social_media_links: {
        portfolio: string;
        github: string;
        linkedin: string;
      };
      scores: {
        technical_skills: {
          score: string;
          justification: string;
          list_of_techinical_skills: string[];
        };
        soft_skills: {
          score: string;
          justification: string;
          list_of_soft_skilss: string[];
        };
        company_culture_fit: {
          score: string;
          justification: string;
        };
        availability_flexibility: {
          score: string;
          justification: string;
        };
        experience_professionalism: {
          score: string;
          justification: string;
        };
        strengths: string;
        weaknesses: string;
      };
    };
    job_description: string;
  };
  shortlist: boolean;
  email_sent: boolean;
  inerview_booked: boolean;
  interested: boolean;
  createdAt: string;
  updatedAt: string;
}
