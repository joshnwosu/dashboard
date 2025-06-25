'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Search, Users, Grid3X3, List } from 'lucide-react';
import { BadgeDelta } from '@/components/badge-delta';
import { Candidate, CandidateData } from '@/types/candidate';
import CandidateDetailSheet from '@/components/candidate/candidate-detail-sheet';
import CandidateInfo from '@/components/candidate/candidate-info';
import CandidateSummary from '@/components/candidate/candidate-summary';
import SocialMediaIcons from '@/components/candidate/social-media-icons';
import ActionButtons from '@/components/candidate/action-button';
import Avatar from '@/components/candidate/avatar';
import { useJobStore } from '@/store/jobStore';
import CandidateDetailModal from '@/components/candidate/candidate-detail-modal';

interface CardGridProps {
  items: Candidate[];
  loading?: boolean;
  sourceCompleted?: boolean;
}

type ViewMode = 'grid' | 'list';

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
  sourceCompleted,
}: CardGridProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const { selectedCandidate, fetchingCandidate } = useJobStore();

  useEffect(() => {
    if (!loading && items && items.length > 0 && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, items, hasAnimated]);

  const handleClose = () => {
    setOpen(false);
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
    item: Candidate;
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
        layout
        className={`rounded-xl dark:bg-sidebar/50 ring-2 dark:ring-1 ring-accent cursor-pointer hover:bg-sidebar hover:dark:bg-sidebar transition-colors duration-200 ${
          isListView ? 'p-4' : 'p-6 flex flex-col gap-4'
        }`}
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
                  setOpen={() => setOpen(true)}
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
                setOpen={() => setOpen(true)}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    );
  };

  // Loading State
  if (loading || !items || items.length === 0) {
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

  // // Empty State
  // if (!items || items.length === 0) {
  //   return <EmptyState />;
  // }

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

      {selectedCandidate && (
        <CandidateDetailModal
          item={selectedCandidate}
          open={open}
          onOpenChange={handleClose}
          isLoading={fetchingCandidate}
        />
      )}
    </div>
  );
}
