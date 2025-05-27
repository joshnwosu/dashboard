import { CandidateData } from '@/types/candidate';

// Sample data based on the provided JSON
export const candidateDummyData: CandidateData = {
  id: 8,
  name: 'Joshua Nwosu',
  email: 'joshuanwosu078@gmail.com',
  phone: '+234 701 6000 160',
  linkedin_url: 'linkedin',
  github_url: 'GitHub',
  profile_pic_url: null,
  country: null,
  timezone: 'Africa/Lagos',
  talent_score: '85',
  overall_recommendation: 'Strong Match',
  justification:
    "Joshua is a strong candidate for the Software Engineer position. He has the required experience and technical skills. He also has strong soft skills and a proven ability to collaborate and communicate effectively. However, further clarification is needed regarding his willingness to relocate and his fit with the company's specific culture and values.",
  cv_score_result: {
    candidates: {
      profile_info: {
        nationality: 'Nigeria',
        timezone: 'Africa/Lagos',
      },
      social_media_links: {
        portfolio: 'joshnwosu.vercel.app',
        github: 'GitHub',
        linkedin: 'linkedin',
      },
      scores: {
        technical_skills: {
          score: '90',
          justification:
            'Joshua demonstrates a high level of proficiency in a wide range of relevant technologies. His experience includes JavaScript, TypeScript, Node, React, React Native, Vue, and more. He also has experience with databases (MongoDB, SQL), cloud technologies (Firebase, Heroku, Vercel), and testing frameworks (Jest, Cypress).',
          list_of_techinical_skills: [
            'JavaScript',
            'TypeScript',
            'Node',
            'React',
            'React Native',
            'Firebase',
            'Svelte',
            'Vue',
            'Redux',
            'Mongodb',
            'Git',
            'HTML/CSS',
            'ElectronJS',
            'Cloudinary',
            'Agile',
            'Heroku',
            'CI/CD',
            'Docker',
            'Unit Testing',
            'Vitest',
            'Jest',
            'Cypress',
            'Modular Architecture',
            'OOP',
            'Microservices',
            'Desktop',
            'Mobile',
            'Frontend',
            'Backend',
            'Full Stack',
            'Debugging',
            'Nestjs',
            'SQL',
            'Vercel',
          ],
        },
        soft_skills: {
          score: '85',
          justification:
            "The candidate's experience demonstrates strong collaboration and communication skills. The CV highlights experience working in team environments and collaborating with design and backend teams. The candidate also proactively identified and resolved bugs, indicating problem-solving skills.",
          list_of_soft_skilss: [
            'Collaboration',
            'Problem-solving',
            'Communication',
          ],
        },
        company_culture_fit: {
          score: '80',
          justification:
            "Joshua's experience in developing user-friendly interfaces and implementing analytics functionality aligns with a focus on user experience and data-driven decision-making. His experience in developing secure payment gateways also aligns with the need for security and trust. However, further information about the company's specific culture and values is needed to make a more accurate assessment.",
        },
        availability_flexibility: {
          score: '70',
          justification:
            'The candidate has experience working remotely and in hybrid environments, indicating a degree of flexibility. The job locations specified in the job description include Pakistan, India, Egypt, Bangladesh, Philippines, Europe. It is unclear whether the candidate is willing to relocate or work in these locations. Further clarification is needed.',
        },
        experience_professionalism: {
          score: '90',
          justification:
            'Joshua has over 3 years of professional experience as a Software Engineer and Mobile Developer. His roles include Senior Mobile Developer and Senior Frontend Engineer, indicating increasing levels of responsibility. He has experience in developing and maintaining web applications, mobile applications, and dashboards.',
        },
        strengths:
          'Strong technical skills in JavaScript, TypeScript, React, Node.js, and other relevant technologies. Experience in developing web applications, mobile applications, and dashboards. Proven ability to collaborate and communicate effectively. Experience in developing secure payment gateways.',
        weaknesses:
          "Unclear whether the candidate is willing to relocate. Further information about the company's specific culture and values is needed to make a more accurate assessment of cultural fit.",
      },
    },
    job_description:
      "Exciting Opportunity for Experienced Software Engineers! Key Requirements: - 7+ years of hands-on software engineering experience - Proficiency in at least one of the following tech stacks: Python, C#/.NET, MERN (MongoDB, Express, React, Node.js), Angular, Vue.js, Ruby on Rails, AI/ML, DevOps, Java/Spring Boot, Go, Scala, IOT Engineer, Civil Engineer, DevOps Engineer - Strong problem-solving skills - Excellent communication and collaboration abilities - Bachelor's degree in Computer Science or a related field",
  },
  shortlist: false,
  email_sent: false,
  inerview_booked: false,
  interested: false,
  createdAt: '2025-05-24T15:53:34.000Z',
  updatedAt: '2025-05-24T15:53:35.000Z',
};
