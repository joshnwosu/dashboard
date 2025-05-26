'use client';

import { motion } from 'framer-motion';
import { GlobeIcon } from 'lucide-react';
import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';
import { Candidate } from '@/types/candidate';

const SocialMediaIcons = ({
  item,
  size = 'default',
}: {
  item: Candidate;
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

export default SocialMediaIcons;
