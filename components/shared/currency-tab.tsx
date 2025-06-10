'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface CurrencyTabProps {
  currency: string;
  selected: boolean;
  setSelected: (currency: string) => void;
  symbol?: string;
}

export function CurrencyTab({
  currency,
  selected,
  setSelected,
  symbol,
}: CurrencyTabProps) {
  return (
    <button
      onClick={() => setSelected(currency)}
      className={cn(
        'relative w-fit px-4 py-2 text-sm font-semibold',
        'text-foreground transition-colors',
        'flex items-center justify-center gap-1.5'
      )}
    >
      {symbol && (
        <span className='relative z-10 text-xs opacity-75'>{symbol}</span>
      )}
      <span className='relative z-10'>{currency}</span>
      {selected && (
        <motion.span
          layoutId='currency-tab'
          transition={{ type: 'spring', duration: 0.4 }}
          className='absolute inset-0 z-0 rounded-full bg-background shadow-sm'
        />
      )}
    </button>
  );
}
