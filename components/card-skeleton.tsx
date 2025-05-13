// /components/card-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function CardSkeleton() {
  return (
    <div className='rounded-xl bg-background ring-2 dark:ring-1 ring-accent p-6 flex flex-col gap-4'>
      <div className='flex justify-between items-start gap-4'>
        <div className='flex gap-4 items-start'>
          <Skeleton className='h-20 w-20 rounded-full' />
          <div className='flex flex-1 flex-col gap-2'>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-4 w-48' />
            <div className='mt-2 flex gap-2'>
              <Skeleton className='h-8 w-8 rounded-md' />
              <Skeleton className='h-8 w-8 rounded-md' />
            </div>
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </div>
      <div className='flex flex-wrap'>
        <Skeleton className='h-6 w-24 rounded-full' />
      </div>
      <div className='flex items-center gap-4 justify-end'>
        <Skeleton className='h-10 w-24 rounded-md' />
        <Skeleton className='h-10 w-24 rounded-md' />
      </div>
    </div>
  );
}
