'use client';

import TransactionTable from '@/components/transaction-table';
import { Button } from '@/components/ui/button';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { formatAmountWithOptions } from '@/utils/formatter';
// import { useEffect } from 'react';

export default function BillingSettings() {
  const { companySubscription } = useSubscriptionStore();

  // useEffect(() => {
  //   console.log('HII: ', companySubscription);
  // }, []);

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Current Plan
        </h3>
        <div className='rounded-lg border border-gray-300 dark:border-muted p-4 bg-gray-50 dark:bg-sidebar'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                {companySubscription?.data.plan.name} Plan
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {formatAmountWithOptions(
                  companySubscription?.data.plan.amount!,
                  {
                    decimals: 2,
                    showCurrency: true,
                    currency: companySubscription?.data.plan.currency,
                  }
                )}
                /
                {companySubscription?.data.plan.interval === 'monthly'
                  ? 'month'
                  : companySubscription?.data.plan.interval}
              </p>
            </div>

            <Button>Change Plan</Button>
          </div>
        </div>
      </div>

      <TransactionTable title='Billing History' />

      {false && (
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Payment Method
          </h3>
          <div className='rounded-lg border border-gray-300 dark:border-muted p-4 bg-gray-50 dark:bg-sidebar'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-900 dark:text-gray-100'>
                  •••• •••• •••• 1234
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Expires 12/25
                </p>
              </div>
              <button className='rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {false && (
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Billing History
          </h3>

          <div className='space-y-2'>
            <div className='flex justify-between items-center py-2 border-b'>
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                Dec 2024 - Pro Plan
              </span>
              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                $19.00
              </span>
            </div>
            <div className='flex justify-between items-center py-2 border-b'>
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                Nov 2024 - Pro Plan
              </span>
              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                $19.00
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
