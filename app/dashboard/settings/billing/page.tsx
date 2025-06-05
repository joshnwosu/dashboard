import { redirect } from 'next/navigation';

export default function BillingSettings() {
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
                Pro Plan
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                $19/month
              </p>
            </div>
            <button className='rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
              Change Plan
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
}
