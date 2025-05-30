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
import { DashboardAnalysisData } from '@/types/transaction';

export function DashboardAnalysis({ data }: { data: DashboardAnalysisData }) {
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
            {data.total_search_jobs}
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
              <BookmarkIcon className='size-4' />
            </div>
            <CardDescription>Total CV Screning</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            {data.total_cv_screening_jobs}
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
              <UsersIcon className='size-4' />
            </div>
            <CardDescription>Total Transactions</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            {data.total_number_of_transaction}
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
            <CardDescription>Credit Balance</CardDescription>
          </div>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            {data.subscription_credit_balance}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
