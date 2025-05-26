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

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
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
  if (!name || name.trim() === '') return '?';
  return name.charAt(0).toUpperCase();
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
