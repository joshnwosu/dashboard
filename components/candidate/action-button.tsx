import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';
import { Bookmark, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const ActionButtons = ({
  item,
  index,
  onCardClick,
  size = 'sm',
}: {
  item: Candidate;
  index: number;
  onCardClick: (item: Candidate, index: number) => void;
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

export default ActionButtons;
