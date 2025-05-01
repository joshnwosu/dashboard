// utils/analyzePrompt.ts
import { skills } from '@/data/skills';
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

const skillsSet = new Set(skills.map((skill) => skill.toLowerCase()));

// Utility function to analyze prompt and determine active badges
export const analyzePrompt = (prompt: string): BadgeStates => {
  // Initialize NLP document
  const doc = nlp(prompt) as unknown as CompromiseDoc;

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

  // Job Title: Detect nouns or terms that resemble job titles
  const nouns: string[] = doc.nouns().out('array');
  const terms: string[] = doc.terms().out('array');
  badgeStates['Job Title'] =
    nouns.some((noun) =>
      /software|engineer|designer|manager|developer|analyst|architect|consultant/i.test(
        noun
      )
    ) ||
    terms.some((term) =>
      /software|engineer|designer|manager|developer|analyst|architect|consultant/i.test(
        term
      )
    );

  // Years of Experience: Regex for "X+ years" or "X years"
  badgeStates.Experience = /\d+\+?\s*years/i.test(prompt);

  // Industry: Common industry keywords (case-insensitive)
  badgeStates.Industry =
    /fintech|startup|tech|healthcare|finance|marketing|education/i.test(
      prompt.toLowerCase()
    );

  // // Skills: Common technical skills (case-insensitive)
  // badgeStates.Skills =
  //   /python|javascript|figma|adobe xd|seo|aws|react|typescript|sql/i.test(
  //     prompt.toLowerCase()
  //   );

  // Check if any skill is present in the prompt using Set
  // badgeStates.Skills = prompt
  //   .toLowerCase()
  //   .split(/\W+/)
  //   .some((word) => skillsSet.has(word));

  badgeStates.Skills = skills.some((skill) =>
    new RegExp(
      `\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'i'
    ).test(prompt)
  );

  // Job Type: Common job types (case-insensitive)
  badgeStates['Job Type'] =
    /remote|full time|full-time|on site|on-site|part time|part-time|contract/i.test(
      prompt.toLowerCase()
    );

  return badgeStates;
};
