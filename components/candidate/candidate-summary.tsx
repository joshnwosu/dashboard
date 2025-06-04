'use client';

import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';
import { generatePlaceholderText, isFieldLoading } from '@/utils/formatter';
import SkeletonLine from './skeleton-line';

const CandidateSummary = ({
  item,
  index,
  hasAnimated,
  showSkeleton = true,
}: {
  item: Candidate;
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

export default CandidateSummary;
