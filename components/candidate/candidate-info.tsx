import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';
import { isFieldLoading } from '@/utils/formatter';
import { Building, MapPin } from 'lucide-react';
import SkeletonLine from './skeleton-line';

const CandidateInfo = ({
  item,
  index,
  hasAnimated,
  titleSize = 'text-sm',
  showFullInfo = false,
}: {
  item: Candidate;
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

export default CandidateInfo;
