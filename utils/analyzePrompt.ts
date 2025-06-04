// utils/analyzePrompt.ts
import { skills } from '@/data/skills';
import { jobTitles } from '@/data/jobTitles';
import { industries } from '@/data/industries';
import nlp from 'compromise';

// Minimal type for Compromise document to ensure type safety
interface CompromiseDoc {
  places: () => { length: number };
  nouns: () => { out: (format: 'array') => string[] };
  terms: () => { out: (format: 'array') => string[] };
}

// Define the BadgeStates interface for type safety
export interface BadgeStates {
  Location: boolean;
  Skills: boolean;
  Experience: boolean;
  Industry: boolean;
  'Job Title': boolean;
  'Job Type': boolean;
}

// const skillsSet = new Set(skills.map((skill) => skill.toLowerCase()));
// const jobTitlesSet = new Set(jobTitles.map((title) => title.toLowerCase()));
// const industriesSet = new Set(
//   industries.map((industry) => industry.toLowerCase())
// );

// Helper function to create a case-insensitive word boundary regex
const createWordBoundaryRegex = (term: string): RegExp => {
  return new RegExp(
    `\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
    'i'
  );
};

// Utility function to analyze prompt and determine active badges
export const analyzePrompt = (prompt: string): BadgeStates => {
  // Initialize NLP document
  const doc = nlp(prompt) as unknown as CompromiseDoc;
  const promptLower = prompt.toLowerCase();

  // Initialize badge states
  const badgeStates: BadgeStates = {
    Location: false,
    Skills: false,
    Experience: false,
    Industry: false,
    'Job Title': false,
    'Job Type': false,
  };

  // Location: Detect countries, states, cities, or other places
  badgeStates.Location = doc.places().length > 0;

  // Job Title: Check against our comprehensive list of job titles
  badgeStates['Job Title'] = jobTitles.some((title) =>
    createWordBoundaryRegex(title).test(prompt)
  );

  // Years of Experience: Regex for "X+ years" or "X years" or "X yr" or "X year"
  badgeStates.Experience = /\d+\+?\s*(years?|yr)/i.test(prompt);

  // Industry: Check against our comprehensive list of industries
  badgeStates.Industry = industries.some((industry) =>
    createWordBoundaryRegex(industry).test(prompt)
  );

  // Skills: Check against our skills list
  badgeStates.Skills = skills.some((skill) =>
    createWordBoundaryRegex(skill).test(prompt)
  );

  // Job Type: Common job types (case-insensitive)
  const jobTypes = [
    'remote',
    'fulltime',
    'full time',
    'full-time',
    'onsite',
    'on site',
    'on-site',
    'parttime',
    'part time',
    'part-time',
    'contract',
    'permanent',
    'temporary',
    'freelance',
    'hybrid',
  ];

  badgeStates['Job Type'] = jobTypes.some((type) => promptLower.includes(type));

  return badgeStates;
};
