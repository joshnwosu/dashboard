'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='relative'
          aria-label='Open mode toggle'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-25 p-1' align='end'>
        {['light', 'dark', 'system'].map((mode, index) => (
          <div
            key={index.toString()}
            className='rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent'
          >
            <div
              onClick={() => setTheme(mode)}
              className='relative flex items-start'
            >
              {mode}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
