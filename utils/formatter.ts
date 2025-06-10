import { Candidate } from '@/types/candidate';

export function formatDateToShortString(dateStr: string): string {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(',', '');
}

export const formatTime = (dateString: string): string => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};

export const formatDateTime = (dateString: string): string => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

// Helper functions
export const isFieldLoading = (value: string | null | undefined): boolean => {
  return (
    !value || value.trim() === '' || value === 'null' || value === 'undefined'
  );
};

export const getInitials = (name: string): string => {
  if (!name) return '';

  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const getAvatarColor = (name: string): string => {
  if (!name) return 'bg-muted';

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
  ];

  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

export const generatePlaceholderText = (item: Candidate): string => {
  // Priority 1: Use job title and company
  if (item.jobTitle && item.company) {
    return `${item.jobTitle} at ${item.company} • Professional profile available for detailed review`;
  }

  // Priority 2: Use job title only
  if (item.jobTitle) {
    return `${item.jobTitle} • Experienced professional ready for new opportunities`;
  }

  // Priority 3: Use available platforms to suggest expertise
  if (item.github_url && item.linkedin_url) {
    return 'Active developer with verified professional background • Technical portfolio and experience available';
  }

  if (item.github_url) {
    return 'Developer with active GitHub contributions • Technical expertise and project history available';
  }

  if (item.linkedin_url) {
    return 'Professional with verified LinkedIn presence • Career background and connections available';
  }

  // Fallback
  return 'Verified professional candidate • Complete profile and background available upon request';
};

// Basic function to format numbers with commas
export function formatAmount(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return '0';
  }

  return num.toLocaleString();
}

// More comprehensive function with options
interface FormatAmountOptions {
  decimals?: number;
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
}

export function formatAmountWithOptions(
  amount: number | string,
  options: FormatAmountOptions = {}
): string {
  const {
    decimals = 2,
    currency = 'USD',
    locale = 'en-US',
    showCurrency = false,
  } = options;

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return showCurrency ? `$0.00` : '0.00';
  }

  if (showCurrency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// Simple currency formatter
export function formatCurrency(
  amount: number | string,
  currency: string = 'USD'
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(num);
}

// Format large numbers with K, M, B suffixes
export function formatAmountCompact(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return '0';
  }

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }

  return num.toLocaleString();
}

// Format percentage
export function formatPercentage(
  amount: number | string,
  decimals: number = 1
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return '0%';
  }

  return `${num.toFixed(decimals)}%`;
}

// Usage Examples:
/*
console.log(formatAmount(1234567.89));           // "1,234,567.89"
console.log(formatAmount("1234567"));            // "1,234,567"

console.log(formatAmountWithOptions(1234567.89, {
  decimals: 0,
  showCurrency: true
}));                                             // "$1,234,568"

console.log(formatCurrency(1234567.89));        // "$1,234,567.89"
console.log(formatCurrency(1234567.89, 'EUR')); // "€1,234,567.89"

console.log(formatAmountCompact(1234567));       // "1.2M"
console.log(formatAmountCompact(1234567890));    // "1.2B"

console.log(formatPercentage(12.345));           // "12.3%"
console.log(formatPercentage(12.345, 2));        // "12.35%"
*/
