'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
    setOpen(false); // Close the popover after selection
  };

  const getThemeIcon = (mode: string) => {
    switch (mode) {
      case 'light':
        return <Sun className='h-4 w-4 mr-2' />;
      case 'dark':
        return <Moon className='h-4 w-4 mr-2' />;
      case 'system':
        return <Monitor className='h-4 w-4 mr-2' />;
      default:
        return null;
    }
  };

  const getThemeLabel = (mode: string) => {
    switch (mode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return mode;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
      <PopoverContent className='w-40 p-1' align='end'>
        {['light', 'dark', 'system'].map((mode, index) => (
          <div
            key={index.toString()}
            className='rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent cursor-pointer'
            onClick={() => handleThemeChange(mode)}
          >
            <div className='relative flex items-center'>
              {getThemeIcon(mode)}
              {getThemeLabel(mode)}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
