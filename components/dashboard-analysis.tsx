import {
  BookmarkIcon,
  BriefcaseIcon,
  SearchCodeIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function DashboardAnalysis() {
  return (
    <div className='*:data-[slot=card]:bg-background *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4'>
      <Card className='@container/card'>
        <CardHeader className='relative'>
          <div className='flex items-center gap-4 mb-2'>
            <div
              className={
                'flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'
              }
            >
              <SearchCodeIcon className='size-4' />
            </div>
            <CardDescription>Total Search</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            450
          </CardTitle>
          <div className='absolute right-4 bottom-0'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card className='@container/card'>
        <CardHeader className='relative'>
          <div className='flex items-center gap-4 mb-2'>
            <div
              className={
                'flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'
              }
            >
              <BookmarkIcon className='size-4' />
            </div>
            <CardDescription>Shotlist</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            1,234
          </CardTitle>
          <div className='absolute right-4 bottom-0'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card className='@container/card'>
        <CardHeader className='relative'>
          <div className='flex items-center gap-4 mb-2'>
            <div
              className={
                'flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'
              }
            >
              <UsersIcon className='size-4' />
            </div>
            <CardDescription>Interested Candidates</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            230
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className='@container/card'>
        <CardHeader className='relative'>
          <div className='flex items-center gap-4 mb-2'>
            <div
              className={
                'flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'
              }
            >
              <BriefcaseIcon className='size-4' />
            </div>
            <CardDescription>Total Jobs</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            5
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
