'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
} from 'lucide-react';
import { BadgeDelta } from '@/components/badge-delta';
import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';

export interface ItemProps {
  profile_pic_url: string;
  name: string;
  summary: string;
  talent_score: string;
  linkedin_url: string;
  github_url: string;
  country: string;
  email: string;
  justification: string;
  jobTitle: string;
  company: string;
  status: string;
  value?: string;
  type?: 'neutral' | 'increase' | 'decrease' | 'medium';
}

interface CardGridProps {
  items: ItemProps[];
  loading?: boolean;
}

type ViewMode = 'grid' | 'list';

// Helper function to check if a field is empty or loading
const isFieldLoading = (value: string | null | undefined): boolean => {
  return (
    !value || value.trim() === '' || value === 'null' || value === 'undefined'
  );
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  if (!name || name.trim() === '') return '?';
  return name.charAt(0).toUpperCase();
};

// Helper function to generate a consistent color based on name
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

// Skeleton component for reusability
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

// Avatar component that handles both image and initials
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const shouldShowImage = src && !imageError && !isFieldLoading(src);
  const initials = getInitials(name);
  const avatarColor = getAvatarColor(name);
  const sizeClasses = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [src]);

  if (shouldShowImage) {
    return (
      <motion.div
        className={`${sizeClasses} rounded-full overflow-hidden ${className}`}
        initial={
          hasAnimated ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
        }
        animate={{ scale: 1, rotate: 0 }}
        transition={
          hasAnimated
            ? {}
            : {
                type: 'spring',
                damping: 15,
                stiffness: 200,
                delay: index * 0.05 + 0.2,
              }
        }
      >
        {!imageLoaded && (
          <div
            className={`w-full h-full ${avatarColor} flex items-center justify-center text-white font-semibold`}
          >
            {initials}
          </div>
        )}
        <img
          src={src}
          alt={`${name}'s profile`}
          className={`w-full h-full object-cover transition-opacity duration-200 `}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${sizeClasses} rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold ${className}`}
      initial={
        hasAnimated ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
      }
      animate={{ scale: 1, rotate: 0 }}
      transition={
        hasAnimated
          ? {}
          : {
              type: 'spring',
              damping: 15,
              stiffness: 200,
              delay: index * 0.05 + 0.2,
            }
      }
    >
      {initials}
    </motion.div>
  );
};

// Animation variants for better control
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  static: { opacity: 1 }, // Static state without transitions
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      mass: 0.8,
    },
  },
  static: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  hover: {
    y: -8,
    scale: 1.02,
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
};

const listItemVariants = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      mass: 0.8,
    },
  },
  static: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  hover: {
    x: 4,
    scale: 1.01,
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
};

export default function CandidateCardList({
  items,
  loading = false,
}: CardGridProps) {
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Set hasAnimated to true after initial render
  useEffect(() => {
    if (!loading && items && items.length > 0 && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1000); // Wait for animations to complete
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

  // Empty state component
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant='default' className='px-6'>
            <Search className='w-4 h-4 mr-2' />
            Refine Search
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant='outline' className='px-6'>
            <Users className='w-4 h-4 mr-2' />
            Browse All
          </Button>
        </motion.div>
      </motion.div>

      <div className='mt-8 text-xs text-muted-foreground'>
        Need help?{' '}
        <span className='text-primary cursor-pointer hover:underline'>
          Contact support
        </span>
      </div>
    </div>
  );

  // Grid View Component
  const GridView = () => (
    <motion.div
      className='grid auto-rows-min gap-4 md:grid-cols-3'
      variants={containerVariants}
      initial={hasAnimated ? 'static' : 'hidden'}
      animate={hasAnimated ? 'static' : 'visible'}
      key='grid-view'
    >
      {items?.map((item, index) => (
        <motion.div
          key={`grid-${item.name}-${item.email}-${index}`}
          variants={cardVariants}
          initial={hasAnimated ? 'static' : 'hidden'}
          animate={hasAnimated ? 'static' : 'visible'}
          whileHover='hover'
          whileTap='tap'
          layout
          className='rounded-xl dark:bg-sidebar/50 ring-2 dark:ring-1 ring-accent p-6 flex flex-col gap-4 cursor-pointer transition-shadow duration-300 ease-out will-change-transform'
          onClick={() => handleCardClick(item, index)}
          ref={(el) => {
            if (el) cardRefs.current.set(index, el);
            else cardRefs.current.delete(index);
          }}
        >
          <div className='flex justify-between items-start gap-4'>
            <div className='flex gap-4 items-start'>
              <Avatar
                src={item.profile_pic_url}
                name={item.name}
                index={index}
                hasAnimated={hasAnimated}
              />
              <div className='flex flex-1 flex-col'>
                <motion.h2
                  className='text-sm line-clamp-1 font-medium'
                  initial={
                    hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={hasAnimated ? {} : { delay: index * 0.05 + 0.3 }}
                >
                  {isFieldLoading(item.name) ? (
                    <SkeletonLine width='w-32' height='h-4' />
                  ) : (
                    item.name
                  )}
                </motion.h2>
                <motion.div
                  className='mt-2 flex gap-2'
                  initial={
                    hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={hasAnimated ? {} : { delay: index * 0.05 + 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GmailIcon
                      width={24}
                      height={24}
                      className={`transition-opacity duration-200 ${
                        !item.email ? 'opacity-20' : 'hover:opacity-80'
                      }`}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkedinIcon
                      width={24}
                      height={24}
                      className={`transition-opacity duration-200 ${
                        !item.linkedin_url ? 'opacity-20' : 'hover:opacity-80'
                      }`}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GithubIcon
                      width={24}
                      height={24}
                      className={`transition-opacity duration-200 ${
                        !item.github_url ? 'opacity-20' : 'hover:opacity-80'
                      }`}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {isFieldLoading(item.justification) ? (
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
          ) : (
            <motion.p
              className='line-clamp-3 text-md text-muted-foreground'
              initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
            >
              {item.justification}
            </motion.p>
          )}

          <motion.div
            className='flex flex-wrap justify-between items-center mt-auto pt-4'
            initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={hasAnimated ? {} : { delay: index * 0.05 + 0.6 }}
          >
            <BadgeDelta
              variant='complex'
              iconStyle='line'
              value={item?.talent_score ?? 0}
            />

            <div className='flex items-center gap-2'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant='outline' size='sm' className='text-xs'>
                  <span>Shortlist</span>
                  <Bookmark className='w-3 h-3 ml-1' />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant='outline' size='sm' className='text-xs'>
                  <span>View</span>
                  <ExternalLink className='w-3 h-3 ml-1' />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );

  // List View Component
  const ListView = () => (
    <motion.div
      className='space-y-3'
      variants={containerVariants}
      initial={hasAnimated ? 'static' : 'hidden'}
      animate={hasAnimated ? 'static' : 'visible'}
      key='list-view'
    >
      {items?.map((item, index) => (
        <motion.div
          key={`list-${item.name}-${item.email}-${index}`}
          variants={listItemVariants}
          initial={hasAnimated ? 'static' : 'hidden'}
          animate={hasAnimated ? 'static' : 'visible'}
          whileHover='hover'
          whileTap='tap'
          layout
          className='rounded-lg dark:bg-sidebar/50 ring-2 dark:ring-1 ring-accent p-4 cursor-pointer transition-shadow duration-300 ease-out will-change-transform'
          onClick={() => handleCardClick(item, index)}
          ref={(el) => {
            if (el) cardRefs.current.set(index, el);
            else cardRefs.current.delete(index);
          }}
        >
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
                <div className='flex-1 min-w-0'>
                  <motion.h2
                    className='text-lg font-semibold truncate'
                    initial={
                      hasAnimated
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      hasAnimated ? {} : { delay: index * 0.05 + 0.3 }
                    }
                  >
                    {isFieldLoading(item.name) ? (
                      <SkeletonLine width='w-48' height='h-5' />
                    ) : (
                      item.name
                    )}
                  </motion.h2>

                  <div className='flex items-center gap-4 mt-1 text-sm text-muted-foreground'>
                    {!isFieldLoading(item.jobTitle) && (
                      <div className='flex items-center gap-1'>
                        <Building className='w-3 h-3' />
                        <span className='truncate'>{item.jobTitle}</span>
                        {!isFieldLoading(item.company) && (
                          <span>at {item.company}</span>
                        )}
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

                <div className='flex items-center gap-3'>
                  <BadgeDelta
                    variant='complex'
                    iconStyle='line'
                    value={item?.talent_score ?? 0}
                  />
                </div>
              </div>

              {!isFieldLoading(item.justification) && (
                <motion.p
                  className='text-sm text-muted-foreground line-clamp-2 mb-3'
                  initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
                >
                  {item.justification}
                </motion.p>
              )}

              <div className='flex items-center justify-between'>
                <motion.div
                  className='flex gap-3'
                  initial={
                    hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={hasAnimated ? {} : { delay: index * 0.05 + 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GmailIcon
                      width={20}
                      height={20}
                      className={`transition-opacity duration-200 ${
                        !item.email ? 'opacity-20' : 'hover:opacity-80'
                      }`}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkedinIcon
                      width={20}
                      height={20}
                      className={`transition-opacity duration-200 ${
                        !item.linkedin_url ? 'opacity-20' : 'hover:opacity-80'
                      }`}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GithubIcon
                      width={20}
                      height={20}
                      className={`transition-opacity duration-200 ${
                        !item.github_url ? 'opacity-20' : 'hover:opacity-80'
                      }`}
                    />
                  </motion.div>
                </motion.div>

                <div className='flex items-center gap-2'>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant='outline' size='sm' className='text-xs'>
                      <span>Shortlist</span>
                      <Bookmark className='w-3 h-3 ml-1' />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant='outline' size='sm' className='text-xs'>
                      <span>View</span>
                      <ExternalLink className='w-3 h-3 ml-1' />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  if (loading) {
    return (
      <div>
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
              variants={viewMode === 'grid' ? cardVariants : listItemVariants}
              className={`rounded-xl bg-muted/30 animate-pulse p-6 flex ${
                viewMode === 'grid'
                  ? 'flex-col gap-4 h-50'
                  : 'items-center gap-6'
              }`}
            >
              <>
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
              </>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Show empty state when no items
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
        <div className='flex items-center gap-2'>
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
        </div>

        <div className='text-sm text-muted-foreground'>
          {items.length} candidate{items.length !== 1 ? 's' : ''} found
        </div>
      </motion.div>

      {/* Content based on view mode */}
      <AnimatePresence mode='wait'>
        {viewMode === 'grid' ? <GridView /> : <ListView />}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[1100px] flex flex-col h-[80vh] p-0 gap-0 [&>button]:hidden dark:bg-sidebar'>
              <DialogHeader className='flex flex-row justify-between items-center p-4 border-b border-b-border'>
                <DialogTitle className='text-md'>More Info</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
