export const PAYMENT_FREQUENCIES = ['monthly', 'yearly'] as const;

export const TIERS = [
  // {
  //   id: 'free',
  //   name: '🆓 Free',
  //   price: {
  //     monthly: 0,
  //     yearly: 0,
  //   },
  //   description: 'Perfect for kicking the tires and exploring AI search.',
  //   features: [
  //     '1 seat',
  //     '10 candidate sources (LinkedIn & GitHub)',
  //     '15 CV screenings',
  //     'Limited free searches',
  //     'AI Email Templates (coming soon)',
  //   ],
  //   cta: 'Get started',
  //   priceNote: 'per seat/month (billed monthly)',
  // },
  {
    id: 'standard',
    name: '🚀 Standard',
    price: {
      monthly: 99,
      yearly: 79, // 20% discount for yearly
    },
    description: 'For solo recruiters and small teams ready to scale.',
    features: [
      'Everything in Free, plus:',
      '120 candidate sources (LinkedIn, GitHub, Indeed and ATS)',
      '200 CV screenings',
      'Unlimited export credits',
      'AI Email Templates (coming soon)',
    ],
    cta: 'Upgrade Now',
    priceNote: 'per seat/month (billed monthly)',
  },
  {
    id: 'pro',
    name: '⭐️ Pro',
    price: {
      monthly: 149,
      yearly: 119, // 20% discount for yearly
    },
    description: 'Our sweet spot for fast-moving recruiting teams.',
    features: [
      'Everything in Standard, plus:',
      '200 candidate sources (LinkedIn, GitHub, Indeed and ATS)',
      '500 CV screenings',
      'AI-powered email outreach & templates',
      'Early access to new AI Agents (Sourcing, Screening, Interview)',
      'Priority email support',
    ],
    cta: 'Upgrade Now',
    popular: true,
    priceNote: 'per seat/month (billed monthly)',
    yearlyNote: 'Upgrade to annual billing and save 20%!',
  },
  {
    id: 'business',
    name: '🏢 Business',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Enterprise-grade features and support.',
    features: [
      'Everything in Pro, plus:',
      'Unlimited candidate sourcing',
      'Advanced usage analytics',
      'Dedicated onboarding & training',
      'Additional hiring manager seats',
      'ATS/CRM integrations (coming soon)',
      'Priority support (Email, Chat, Slack)',
    ],
    cta: 'Request Demo',
    highlighted: true,
    priceNote: 'pricing (billed annually)',
  },
];
