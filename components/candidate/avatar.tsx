'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAvatarColor, getInitials, isFieldLoading } from '@/utils/formatter';

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

export default Avatar;
