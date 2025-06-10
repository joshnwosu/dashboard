'use client';

import CreditHistoryTable from '@/components/credit-history-table';
import { Button } from '@/components/ui/button';
import { useTransactionStore } from '@/store/transactionStore';
import { formatAmountWithOptions } from '@/utils/formatter';
import { redirect } from 'next/navigation';

export default function CreditsSettings() {
  const { dashboardAnalysis } = useTransactionStore();
  return (
    <div>
      <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
        Credit History
      </h3>
      <div className='space-y-4'>
        <div className='rounded-lg border border-gray-300 dark:border-muted p-4 bg-gray-50 dark:bg-sidebar'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                Available Credits
              </h4>
              <p className='text-2xl text-gray-600 dark:text-gray-400'>
                {formatAmountWithOptions(
                  Number(
                    dashboardAnalysis?.subscription_credit_balance
                  ).toFixed(2),
                  {
                    decimals: 2,
                    showCurrency: false,
                  }
                )}
              </p>
            </div>

            <Button>Buy Credits</Button>
          </div>
        </div>

        <CreditHistoryTable />

        {false && (
          <div className='space-y-2'>
            <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Recent Transactions
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700'>
                <div>
                  <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                    Credit Purchase
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Dec 15, 2024
                  </p>
                </div>
                <p className='text-sm font-medium text-green-600 dark:text-green-400'>
                  +100 credits
                </p>
              </div>
              <div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700'>
                <div>
                  <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                    API Usage
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Dec 14, 2024
                  </p>
                </div>
                <p className='text-sm font-medium text-red-600 dark:text-red-400'>
                  -20 credits
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
