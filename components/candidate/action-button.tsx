// 'use client';

// import { motion } from 'framer-motion';
// import { Candidate } from '@/types/candidate';
// import { Bookmark, ExternalLink } from 'lucide-react';
// import { Button } from '../ui/button';
// import { useJobStore } from '@/store/jobStore';

// const ActionButtons = ({
//   item,
//   index,
//   size = 'sm',
//   setOpen,
// }: {
//   item: Candidate;
//   index: number;
//   setOpen: (open: boolean) => void;
//   size?: 'sm' | 'default';
// }) => {
//   const { fetchCandidate, selectedCandidate } = useJobStore();

//   const handleViewClick = async (item: Candidate, index: number) => {
//     // const card = cardRefs.current.get(index);
//     // if (card) {
//     //   setCardBounds(card.getBoundingClientRect());
//     // }

//     // setFetchingCandidate(true);
//     setOpen(true);

//     try {
//       // Fetch the candidate details
//       await fetchCandidate(item.id);
//     } catch (error) {
//       console.error('Error fetching candidate:', error);
//       // You might want to show an error toast here
//     } finally {
//       // setFetchingCandidate(false);
//     }
//   };

//   return (
//     <div className='flex items-center gap-2'>
//       {[
//         {
//           label: 'Shortlist',
//           icon: Bookmark,
//           onClick: () => console.log(item, index),
//         },
//         {
//           label: 'View',
//           icon: ExternalLink,
//           onClick: () => handleViewClick(item, index),
//           // onClick: () => window.open(item.profile_url, '_blank'),
//         },
//       ].map(({ label, icon: Icon, onClick }) => (
//         <motion.div
//           key={label}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Button
//             variant='outline'
//             size={size}
//             className='text-xs cursor-pointer'
//             onClick={onClick}
//           >
//             <span>{label}</span>
//             <Icon className='w-3 h-3 ml-1' />
//           </Button>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ActionButtons;

'use client';

import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';
import { Bookmark, ExternalLink, BookmarkCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { useJobStore } from '@/store/jobStore';
import { useState } from 'react';
import { toast } from 'sonner'; // Assuming you're using sonner for toasts

const ActionButtons = ({
  item,
  index,
  size = 'sm',
  setOpen,
}: {
  item: Candidate;
  index: number;
  setOpen: (open: boolean) => void;
  size?: 'sm' | 'default';
}) => {
  const { fetchCandidate, addToShortlist, loading } = useJobStore();
  const [shortlistLoading, setShortlistLoading] = useState(false);

  const handleViewClick = async (item: Candidate, index: number) => {
    setOpen(true);

    try {
      await fetchCandidate(item.id);
    } catch (error) {
      console.error('Error fetching candidate:', error);
      toast.error('Failed to fetch candidate details');
    }
  };

  const handleShortlistClick = async (item: Candidate) => {
    if (shortlistLoading) return;

    setShortlistLoading(true);

    try {
      await addToShortlist(item.id);
      toast.success(`${item.name || 'Candidate'} added to shortlist`);
    } catch (error) {
      console.error('Error adding to shortlist:', error);
      toast.error('Failed to add candidate to shortlist');
    } finally {
      setShortlistLoading(false);
    }
  };

  const actionButtons = [
    {
      label: item.shortlist ? 'Shortlisted' : 'Shortlist',
      icon: item.shortlist ? BookmarkCheck : Bookmark,
      onClick: () => handleShortlistClick(item),
      loading: shortlistLoading,
      disabled: item.shortlist,
      variant: item.shortlist ? 'default' : 'outline',
    },
    {
      label: 'View',
      icon: ExternalLink,
      onClick: () => handleViewClick(item, index),
      loading: false,
      disabled: loading,
      variant: 'outline',
    },
  ];

  return (
    <div className='flex items-center gap-2'>
      {actionButtons.map(
        ({
          label,
          icon: Icon,
          onClick,
          loading: btnLoading,
          disabled,
          variant,
        }) => (
          <motion.div
            key={label}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
          >
            <Button
              variant={variant as 'outline' | 'default'}
              size={size}
              className={`text-xs cursor-pointer ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                label === 'Shortlisted'
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : ''
              }`}
              onClick={onClick}
              disabled={disabled}
            >
              <span>{btnLoading ? 'Loading...' : label}</span>
              {!btnLoading && <Icon className='w-3 h-3 ml-1' />}
              {btnLoading && (
                <div className='w-3 h-3 ml-1 border border-current border-t-transparent rounded-full animate-spin' />
              )}
            </Button>
          </motion.div>
        )
      )}
    </div>
  );
};

export default ActionButtons;
