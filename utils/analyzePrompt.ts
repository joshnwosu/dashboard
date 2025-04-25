// utils/analyzePrompt.ts
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
  'Years of Experience': boolean;
  Industry: boolean;
  'Job Title': boolean;
}

// Utility function to analyze prompt and determine active badges
export const analyzePrompt = (prompt: string): BadgeStates => {
  // Initialize NLP document
  const doc = nlp(prompt) as unknown as CompromiseDoc;

  // Initialize badge states
  const badgeStates: BadgeStates = {
    Location: false,
    Skills: false,
    'Years of Experience': false,
    Industry: false,
    'Job Title': false,
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
  badgeStates['Years of Experience'] = /\d+\+?\s*years/i.test(prompt);

  // Industry: Common industry keywords (case-insensitive)
  badgeStates.Industry =
    /fintech|startup|tech|healthcare|finance|marketing|education/i.test(
      prompt.toLowerCase()
    );

  // Skills: Common technical skills (case-insensitive)
  badgeStates.Skills =
    /python|javascript|figma|adobe xd|seo|aws|react|typescript|sql/i.test(
      prompt.toLowerCase()
    );

  return badgeStates;
};
