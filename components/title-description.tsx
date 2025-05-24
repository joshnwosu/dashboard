'use client';

import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TitleDescriptionProps {
  title: string;
  description?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function TitleDescription({
  title,
  description,
  showButton = false,
  buttonText = 'Continue',
  onButtonClick,
}: TitleDescriptionProps) {
  const router = useRouter();
  return (
    <div className='flex flex-col'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full cursor-pointer hover:bg-muted dark:hover:bg-muted'
            onClick={() => router.back()}
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className='text-2xl font-normal'>{title ?? 'Page Title'}</h1>
            {description && (
              <p className='text-lg text-gray-500'>{description}</p>
            )}
          </div>
        </div>
        {showButton && (
          <Button onClick={onButtonClick} className='ml-4 mt-1'>
            {buttonText}
          </Button>
        )}
      </div>
      <Separator className='my-4' />
    </div>
  );
}
