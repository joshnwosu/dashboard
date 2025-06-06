import {
  BookmarkIcon,
  BriefcaseIcon,
  SearchCodeIcon,
  TrendingUpIcon,
  UsersIcon,
  CreditCardIcon,
  ActivityIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardAnalysisData } from '@/types/transaction';
import { formatAmountWithOptions } from '@/utils/formatter';

interface MetricCard {
  key: keyof DashboardAnalysisData;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: number;
  format?: 'currency' | 'number';
  bgColor?: string;
}

// Define all possible metrics with priority (lower number = higher priority)
const ALL_METRICS: MetricCard[] = [
  {
    key: 'subscription_credit_balance',
    title: 'Credit Balance',
    icon: CreditCardIcon,
    priority: 1,
    format: 'currency',
    bgColor: 'bg-green-500',
  },
  {
    key: 'total_number_of_transaction',
    title: 'Total Transactions',
    icon: UsersIcon,
    priority: 2,
    format: 'number',
    bgColor: 'bg-blue-500',
  },
  {
    key: 'total_amount_of_transaction',
    title: 'Transaction Amount',
    icon: TrendingUpIcon,
    priority: 3,
    format: 'currency',
    bgColor: 'bg-purple-500',
  },
  {
    key: 'total_jobs',
    title: 'Total Jobs',
    icon: BriefcaseIcon,
    priority: 4,
    format: 'number',
    bgColor: 'bg-orange-500',
  },
  {
    key: 'total_search_jobs',
    title: 'Search Jobs',
    icon: SearchCodeIcon,
    priority: 5,
    format: 'number',
    bgColor: 'bg-indigo-500',
  },
  {
    key: 'total_cv_screening_jobs',
    title: 'CV Screening Jobs',
    icon: BookmarkIcon,
    priority: 6,
    format: 'number',
    bgColor: 'bg-pink-500',
  },
  {
    key: 'total_credit_history',
    title: 'Credit History',
    icon: ActivityIcon,
    priority: 7,
    format: 'number',
    bgColor: 'bg-teal-500',
  },
];

export function DashboardAnalysis({ data }: { data: DashboardAnalysisData }) {
  const [showAll, setShowAll] = useState(false);

  // Get all metrics, prioritizing ones with values > 0
  const getAllMetrics = (): MetricCard[] => {
    // Separate metrics with values > 0 from those with 0 values
    const metricsWithValues = ALL_METRICS.filter((metric) => {
      const value = data[metric?.key];
      return typeof value === 'number' && value > 0;
    });

    const metricsWithZeroValues = ALL_METRICS.filter((metric) => {
      const value = data[metric.key];
      return typeof value === 'number' && value === 0;
    });

    // Sort both groups by priority, then combine (non-zero first)
    const sortedWithValues = metricsWithValues.sort(
      (a, b) => a.priority - b.priority
    );
    const sortedWithZeros = metricsWithZeroValues.sort(
      (a, b) => a.priority - b.priority
    );

    return [...sortedWithValues, ...sortedWithZeros];
  };

  const allMetrics = getAllMetrics();
  const displayedMetrics = showAll ? allMetrics : allMetrics.slice(0, 4);
  const hasMoreMetrics = allMetrics.length > 4;

  const formatValue = (value: number, format?: 'currency' | 'number') => {
    if (format === 'currency') {
      return formatAmountWithOptions(value.toFixed(2), {
        decimals: 2,
        showCurrency: true,
      });
    }
    return value.toLocaleString();
  };

  const getIconColor = (bgColor?: string) => {
    return bgColor || 'bg-primary';
  };

  return (
    <div className='space-y-4'>
      <div className='*:data-[slot=card]:bg-background *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4'>
        {displayedMetrics.map((metric) => {
          const IconComponent = metric.icon;
          const value = data[metric.key];
          const hasValue = typeof value === 'number' && value > 0;

          return (
            <Card
              key={metric.key}
              className={`@container/card ${!hasValue ? 'opacity-100' : ''}`}
            >
              <CardHeader className='relative'>
                <div className='flex items-center gap-4 mb-2'>
                  <div
                    className={`flex aspect-square size-8 items-center justify-center rounded-lg text-white ${getIconColor(
                      metric.bgColor
                    )}`}
                  >
                    <IconComponent className='size-4' />
                  </div>
                  <CardDescription>{metric.title}</CardDescription>
                </div>
                <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                  {formatValue(value, metric.format)}
                </CardTitle>

                {/* Show badges for different states */}
                <div className='flex items-center gap-2 mt-2'>
                  {metric.key === 'subscription_credit_balance' && (
                    <Badge variant='outline' className='text-xs'>
                      Credits Available
                    </Badge>
                  )}
                  {!hasValue && (
                    <Badge variant='secondary' className='text-xs opacity-70'>
                      No Activity
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Show/Hide toggle button */}
      {hasMoreMetrics && (
        <div className='flex justify-center'>
          <button
            onClick={() => setShowAll(!showAll)}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted'
          >
            {showAll ? (
              <>
                <ChevronUpIcon className='size-4' />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className='size-4' />
                View All ({allMetrics.length - 4} more)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
