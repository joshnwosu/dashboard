'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  Eye,
  FileText,
  Search,
  Users,
  Grid3X3,
  List,
  MapPin,
  Building,
  Mail,
  ExternalLink,
  GlobeIcon,
  Clock,
  Award,
  Star,
  CheckCircle,
  MessageSquare,
  Copy,
  Phone,
  Globe,
  UserCheck,
  Send,
  Calendar,
} from 'lucide-react';
import { BadgeDelta } from '@/components/badge-delta';
import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export interface ItemProps {
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

interface CardGridProps {
  items: ItemProps[];
  loading?: boolean;
}

type ViewMode = 'grid' | 'list';

// Helper functions
const isFieldLoading = (value: string | null | undefined): boolean => {
  return (
    !value || value.trim() === '' || value === 'null' || value === 'undefined'
  );
};

const getInitials = (name: string): string => {
  if (!name || name.trim() === '') return '?';
  return name.charAt(0).toUpperCase();
};

const getAvatarColor = (name: string): string => {
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

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatDateTime = (dateString: string): string => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

// Reusable Components
const SkeletonLine = ({
  width = 'w-full',
  height = 'h-3',
  className = '',
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`${height} bg-muted/90 rounded animate-pulse ${width} ${className}`}
  />
);

const Avatar = ({
  src,
  name,
  className = '',
  index,
  hasAnimated,
  size = 'default',
}: {
  src: string | null | undefined;
  name: string;
  className?: string;
  index: number;
  hasAnimated: boolean;
  size?: 'default' | 'large';
}) => {
  const [imageError, setImageError] = useState(false);
  const shouldShowImage = src && !imageError && !isFieldLoading(src);
  const initials = getInitials(name);
  const avatarColor = getAvatarColor(name);
  const sizeClasses = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const animationProps = {
    initial: hasAnimated ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: hasAnimated
      ? {}
      : {
          type: 'spring',
          damping: 15,
          stiffness: 200,
          delay: index * 0.05 + 0.2,
        },
  };

  return (
    <motion.div
      className={`${sizeClasses} rounded-full overflow-hidden ${className}`}
      {...animationProps}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={`${name}'s profile`}
          className='w-full h-full object-cover transition-opacity duration-200'
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-full h-full ${avatarColor} flex items-center justify-center text-white font-semibold`}
        >
          {initials}
        </div>
      )}
    </motion.div>
  );
};

const SocialMediaIcons = ({
  item,
  size = 'default',
}: {
  item: ItemProps;
  size?: 'default' | 'small';
}) => {
  const iconSize = size === 'small' ? 20 : 24;
  const globeSize = size === 'small' ? 18 : 19;
  const marginTop = size === 'small' ? '' : 'mt-0.5';

  const icons = [
    { component: GmailIcon, available: !!item.email },
    { component: LinkedinIcon, available: !!item.linkedin_url },
    { component: GithubIcon, available: !!item.github_url },
    {
      component: GlobeIcon,
      available: !!item.website,
      size: globeSize,
      className: marginTop,
    },
  ];

  return (
    <div className='flex gap-2'>
      {icons.map(
        (
          { component: Icon, available, size: customSize, className = '' },
          index
        ) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              width={customSize || iconSize}
              height={customSize || iconSize}
              className={`transition-opacity duration-200 ${
                !available ? 'opacity-20' : 'hover:opacity-80'
              } ${className}`}
            />
          </motion.div>
        )
      )}
    </div>
  );
};

const CandidateInfo = ({
  item,
  index,
  hasAnimated,
  titleSize = 'text-sm',
  showFullInfo = false,
}: {
  item: ItemProps;
  index: number;
  hasAnimated: boolean;
  titleSize?: string;
  showFullInfo?: boolean;
}) => {
  const animationDelay = hasAnimated ? {} : { delay: index * 0.05 + 0.3 };

  return (
    <div className='flex-1 min-w-0'>
      <motion.h2
        className={`${titleSize} line-clamp-1 font-medium ${
          showFullInfo ? 'font-semibold' : ''
        }`}
        initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={animationDelay}
      >
        {isFieldLoading(item.name) ? (
          <SkeletonLine width='w-32' height='h-4' />
        ) : (
          item.name
        )}
      </motion.h2>

      <div className='flex items-center gap-4 mt-1 text-sm text-muted-foreground'>
        {!isFieldLoading(item.jobTitle) && (
          <div className='flex items-center gap-1'>
            <Building className='w-3 h-3' />
            <span className='truncate'>{item.jobTitle}</span>
            {!isFieldLoading(item.company) && <span>at {item.company}</span>}
          </div>
        )}
        {!isFieldLoading(item.country) && (
          <div className='flex items-center gap-1'>
            <MapPin className='w-3 h-3' />
            <span>{item.country}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionButtons = ({
  item,
  index,
  onCardClick,
  size = 'sm',
}: {
  item: ItemProps;
  index: number;
  onCardClick: (item: ItemProps, index: number) => void;
  size?: 'sm' | 'default';
}) => (
  <div className='flex items-center gap-2'>
    {[
      {
        label: 'Shortlist',
        icon: Bookmark,
        onClick: () => console.log(item, index),
      },
      {
        label: 'View',
        icon: ExternalLink,
        onClick: () => onCardClick(item, index),
        // onClick: () => window.open(item.profile_url, '_blank'),
      },
    ].map(({ label, icon: Icon, onClick }) => (
      <motion.div
        key={label}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant='outline'
          size={size}
          className='text-xs cursor-pointer'
          onClick={onClick}
        >
          <span>{label}</span>
          <Icon className='w-3 h-3 ml-1' />
        </Button>
      </motion.div>
    ))}
  </div>
);

const generatePlaceholderText = (item: ItemProps): string => {
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

const CandidateSummary = ({
  item,
  index,
  hasAnimated,
  showSkeleton = true,
}: {
  item: ItemProps;
  index: number;
  hasAnimated: boolean;
  showSkeleton?: boolean;
}) => {
  if (isFieldLoading(item.justification) && showSkeleton) {
    return (
      <motion.div
        className='space-y-2'
        initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
      >
        <SkeletonLine />
        <SkeletonLine width='w-5/6' />
        <SkeletonLine width='w-4/6' />
      </motion.div>
    );
  }

  const displayText = isFieldLoading(item.summary)
    ? generatePlaceholderText(item)
    : item.summary;

  return (
    <motion.p
      className={`line-clamp-3 text-md ${
        isFieldLoading(item.summary)
          ? 'text-muted-foreground/70 italic'
          : 'text-muted-foreground'
      }`}
      initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
    >
      {displayText}
    </motion.p>
  );
};

// Candidate Detail Sheet Component
const CandidateDetailSheet = ({
  item,
  open,
  onOpenChange,
}: {
  item: ItemProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  if (!item) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation?.toLowerCase()) {
      case 'strong':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'consider':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'weak':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='min-w-[500px] sm:w-[800px] overflow-y-auto p-8'>
        <SheetHeader className='space-y-4 pb-6'>
          <div className='flex items-start gap-4'>
            <Avatar
              src={item.profile_pic_url}
              name={item.name}
              size='large'
              index={0}
              hasAnimated={true}
            />
            <div className='flex-1 space-y-2'>
              <div className='flex items-start justify-between'>
                <div>
                  <SheetTitle className='text-2xl font-bold'>
                    {item.name}
                  </SheetTitle>
                  <p className='text-muted-foreground text-lg'>
                    @{item.username}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <Badge className={getStatusColor(item.platform)}>
                    {item.platform}
                  </Badge>
                  {item.shortlist && (
                    <Badge variant='secondary'>
                      <Bookmark className='w-3 h-3 mr-1' />
                      Shortlisted
                    </Badge>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                {item.current_role && (
                  <div className='flex items-center gap-1'>
                    <Building className='w-4 h-4' />
                    <span>{item.current_role}</span>
                  </div>
                )}
                <div className='flex items-center gap-1'>
                  <MapPin className='w-4 h-4' />
                  <span>{item.country}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{item.timezone}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className='space-y-8'>
          {/* Assessment Section */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Award className='w-5 h-5' />
              Assessment
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='p-4 rounded-lg border bg-card'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Talent Score</span>
                  <Star className='w-4 h-4 text-yellow-500' />
                </div>
                <div className='text-2xl font-bold text-primary'>
                  {item.talent_score}/100
                </div>
              </div>

              <div className='p-4 rounded-lg border bg-card'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Recommendation</span>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                </div>
                <Badge
                  className={getRecommendationColor(
                    item.overall_recommendation || ''
                  )}
                >
                  {item.overall_recommendation || 'Not Available'}
                </Badge>
              </div>
            </div>

            {item.justification && (
              <div className='p-4 rounded-lg border bg-card space-y-2'>
                <div className='flex items-center gap-2'>
                  <MessageSquare className='w-4 h-4' />
                  <span className='font-medium'>Justification</span>
                </div>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {item.justification}
                </p>
              </div>
            )}
          </section>

          <Separator />

          {/* Contact Information */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Contact Information
            </h3>
            <div className='space-y-3'>
              {item.email && (
                <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-4 h-4 text-muted-foreground' />
                    <span className='font-medium'>Email</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>
                      {item.email}
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(item.email, 'email')}
                    >
                      {copiedField === 'email' ? (
                        <CheckCircle className='w-4 h-4 text-green-500' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {item.phone && (
                <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-4 h-4 text-muted-foreground' />
                    <span className='font-medium'>Phone</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>
                      {item.phone}
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(item.phone, 'phone')}
                    >
                      {copiedField === 'phone' ? (
                        <CheckCircle className='w-4 h-4 text-green-500' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Social Profiles */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Globe className='w-5 h-5' />
              Social Profiles
            </h3>
            <div className='space-y-3'>
              {[
                {
                  label: 'LinkedIn',
                  url: item.linkedin_url,
                  icon: LinkedinIcon,
                },
                { label: 'GitHub', url: item.github_url, icon: GithubIcon },
                { label: 'Profile', url: item.profile_url, icon: ExternalLink },
                { label: 'Website', url: item.website, icon: Globe },
              ].map(
                ({ label, url, icon: Icon }) =>
                  url && (
                    <div
                      key={label}
                      className='flex items-center justify-between p-3 rounded-lg border bg-card'
                    >
                      <div className='flex items-center gap-3'>
                        <Icon className='w-4 h-4 text-muted-foreground' />
                        <span className='font-medium'>{label}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <a
                          href={url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm text-primary hover:underline truncate max-w-[200px]'
                        >
                          {url}
                        </a>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleCopy(url, label.toLowerCase())}
                        >
                          {copiedField === label.toLowerCase() ? (
                            <CheckCircle className='w-4 h-4 text-green-500' />
                          ) : (
                            <Copy className='w-4 h-4' />
                          )}
                        </Button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </section>

          <Separator />

          {/* Activity Status */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <UserCheck className='w-5 h-5' />
              Activity Status
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='p-4 rounded-lg border bg-card text-center'>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    item.email_sent
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  <Send className='w-3 h-3' />
                  Email {item.email_sent ? 'Sent' : 'Not Sent'}
                </div>
              </div>

              <div className='p-4 rounded-lg border bg-card text-center'>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    item.interview_booked
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  <Calendar className='w-3 h-3' />
                  Interview {item.interview_booked ? 'Booked' : 'Not Booked'}
                </div>
              </div>

              <div className='p-4 rounded-lg border bg-card text-center'>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    item.shortlist
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  <Bookmark className='w-3 h-3' />
                  {item.shortlist ? 'Shortlisted' : 'Not Shortlisted'}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Timeline */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Clock className='w-5 h-5' />
              Timeline
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                <span className='font-medium'>Profile Created</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                <span className='font-medium'>Last Updated</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDate(item.updatedAt)}
                </span>
              </div>
              <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                <span className='font-medium'>Last Profile Sync</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDateTime(item.last_profile_sync)}
                </span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className='space-y-4 pt-4'>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                className='flex-1'
                onClick={() => window.open(item.profile_url, '_blank')}
              >
                <ExternalLink className='w-4 h-4 mr-2' />
                View Profile
              </Button>
              <Button variant='outline' className='flex-1'>
                <Send className='w-4 h-4 mr-2' />
                Send Email
              </Button>
              <Button variant='outline' className='flex-1'>
                <Bookmark className='w-4 h-4 mr-2' />
                {item.shortlist ? 'Remove from Shortlist' : 'Add to Shortlist'}
              </Button>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  static: { opacity: 1 },
};

const createCardVariants = (isListView = false) => ({
  hidden: {
    opacity: 0,
    y: isListView ? 0 : 60,
    x: isListView ? -60 : 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      mass: 0.8,
    },
  },
  static: { opacity: 1, y: 0, x: 0, scale: 1 },
  hover: {
    y: isListView ? 0 : -8,
    x: isListView ? 4 : 0,
    scale: isListView ? 1.01 : 1.02,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 400,
    },
  },
});

export default function CandidateCardList({
  items,
  loading = false,
}: CardGridProps) {
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (!loading && items && items.length > 0 && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, items, hasAnimated]);

  const handleCardClick = (item: ItemProps, index: number) => {
    const card = cardRefs.current.get(index);
    if (card) {
      setCardBounds(card.getBoundingClientRect());
    }
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setCardBounds(null);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  // Empty State Component
  const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
      <div className='mb-6 relative'>
        <div className='w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
          <Users className='w-12 h-12 text-muted-foreground/60' />
        </div>
        <div className='absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
          <Search className='w-4 h-4 text-primary/60' />
        </div>
        <div className='absolute -bottom-1 -left-3 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center'>
          <FileText className='w-3 h-3 text-secondary/60' />
        </div>
      </div>

      <div className='space-y-3 max-w-md'>
        <h3 className='text-xl font-semibold text-foreground'>
          No candidates found
        </h3>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          We couldn't find any candidates matching your criteria. Try adjusting
          your search filters or check back later for new profiles.
        </p>
      </div>

      <motion.div className='flex flex-col sm:flex-row gap-3 mt-8'>
        {[
          { label: 'Refine Search', icon: Search, variant: 'default' as const },
          { label: 'Browse All', icon: Users, variant: 'outline' as const },
        ].map((button) => (
          <motion.div
            key={button.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant={button.variant} className='px-6'>
              <button.icon className='w-4 h-4 mr-2' />
              {button.label}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <div className='mt-8 text-xs text-muted-foreground'>
        Need help?{' '}
        <span className='text-primary cursor-pointer hover:underline'>
          Contact support
        </span>
      </div>
    </div>
  );

  // Card Component for reuse between grid and list views
  const CandidateCard = ({
    item,
    index,
    isListView = false,
  }: {
    item: ItemProps;
    index: number;
    isListView?: boolean;
  }) => {
    const cardVariants = createCardVariants(isListView);

    return (
      <motion.div
        key={`${isListView ? 'list' : 'grid'}-${item.name}-${
          item.email
        }-${index}`}
        variants={cardVariants}
        initial={hasAnimated ? 'static' : 'hidden'}
        animate={hasAnimated ? 'static' : 'visible'}
        // whileHover='hover'
        // whileTap='tap'
        layout
        className={`rounded-xl dark:bg-sidebar/50 ring-2 dark:ring-1 ring-accent cursor-default hover:bg-sidebar hover:dark:bg-sidebar ${
          isListView ? 'p-4' : 'p-6 flex flex-col gap-4'
        }`}
        // onClick={() => handleCardClick(item, index)}
        ref={(el) => {
          if (el) cardRefs.current.set(index, el);
          else cardRefs.current.delete(index);
        }}
      >
        {isListView ? (
          // List View Layout
          <div className='flex items-center gap-6'>
            <Avatar
              src={item.profile_pic_url}
              name={item.name}
              index={index}
              hasAnimated={hasAnimated}
              size='large'
            />

            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between gap-4 mb-2'>
                <CandidateInfo
                  item={item}
                  index={index}
                  hasAnimated={hasAnimated}
                  titleSize='text-lg'
                  showFullInfo
                />
                <BadgeDelta
                  variant='complex'
                  iconStyle='line'
                  value={item?.talent_score ?? 0}
                  label={item.overall_recommendation}
                />
              </div>

              <CandidateSummary
                item={item}
                index={index}
                hasAnimated={hasAnimated}
                showSkeleton={false}
              />

              <div className='flex items-center justify-between mt-3'>
                <motion.div
                  initial={
                    hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={hasAnimated ? {} : { delay: index * 0.05 + 0.4 }}
                >
                  <SocialMediaIcons item={item} size='small' />
                </motion.div>
                <ActionButtons
                  item={item}
                  index={index}
                  onCardClick={handleCardClick}
                />
              </div>
            </div>
          </div>
        ) : (
          // Grid View Layout
          <>
            <div className='flex justify-between items-start gap-4'>
              <div className='flex gap-4 items-start'>
                <Avatar
                  src={item.profile_pic_url}
                  name={item.name}
                  index={index}
                  hasAnimated={hasAnimated}
                />
                <CandidateInfo
                  item={item}
                  index={index}
                  hasAnimated={hasAnimated}
                />
              </div>
            </div>

            <motion.div
              className='mt-2'
              initial={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={hasAnimated ? {} : { delay: index * 0.05 + 0.4 }}
            >
              <SocialMediaIcons item={item} />
            </motion.div>

            <CandidateSummary
              item={item}
              index={index}
              hasAnimated={hasAnimated}
            />

            <motion.div
              className='flex flex-wrap justify-between items-center mt-auto pt-4'
              initial={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={hasAnimated ? {} : { delay: index * 0.05 + 0.6 }}
            >
              <BadgeDelta
                variant='complex'
                iconStyle='line'
                value={item?.talent_score ?? 0}
                label={item.overall_recommendation}
              />

              <ActionButtons
                item={item}
                index={index}
                onCardClick={handleCardClick}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    );
  };

  // Loading State
  if (loading) {
    return (
      <motion.div
        className={
          viewMode === 'grid'
            ? 'grid auto-rows-min gap-4 md:grid-cols-3'
            : 'space-y-3'
        }
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`skeleton-${index}`}
            variants={createCardVariants(viewMode === 'list')}
            className={`rounded-xl bg-muted/30 animate-pulse p-6 flex ${
              viewMode === 'grid' ? 'flex-col gap-4 h-50' : 'items-center gap-6'
            }`}
          >
            <div className='flex gap-4 items-start'>
              <div className='w-12 h-12 rounded-full bg-muted/50' />
              <div className='flex-1'>
                <div className='h-4 bg-muted/50 rounded mb-2 w-3/4' />
                <div className='h-3 bg-muted/50 rounded w-1/2' />
              </div>
            </div>
            <div className='space-y-2'>
              <div className='h-3 bg-muted/50 rounded' />
              <div className='h-3 bg-muted/50 rounded w-5/6' />
              <div className='h-3 bg-muted/50 rounded w-4/6' />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Empty State
  if (!items || items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* View Mode Toggle */}
      <motion.div
        className='flex justify-between items-center mb-6'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant='outline'
            size='sm'
            onClick={toggleViewMode}
            className='transition-all duration-200 hover:bg-accent'
          >
            {viewMode === 'grid' ? (
              <>
                <List className='w-4 h-4 mr-2' />
                List View
              </>
            ) : (
              <>
                <Grid3X3 className='w-4 h-4 mr-2' />
                Grid View
              </>
            )}
          </Button>
        </motion.div>

        <div className='text-sm text-muted-foreground'>
          {items.length} candidate{items.length !== 1 ? 's' : ''} found
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          className={
            viewMode === 'grid'
              ? 'grid auto-rows-min gap-4 md:grid-cols-3'
              : 'space-y-3'
          }
          variants={containerVariants}
          initial={hasAnimated ? 'static' : 'hidden'}
          animate={hasAnimated ? 'static' : 'visible'}
          key={`${viewMode}-view`}
        >
          {items.map((item, index) => (
            <CandidateCard
              key={`${viewMode}-${item.name}-${item.email}-${index}`}
              item={item}
              index={index}
              isListView={viewMode === 'list'}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <CandidateDetailSheet
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={handleClose}
      />
    </div>
  );
}
