import { redirect } from 'next/navigation';

export default function CreditsSettings() {
  return (
    <div>
      <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
        Credit History
      </h3>
      <div className='space-y-4'>
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                Available Credits
              </p>
              <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                500
              </p>
            </div>
            <button className='px-4 py-2 text-sm bg-blue-600 dark:bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors'>
              Buy Credits
            </button>
          </div>
        </div>

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
      </div>
    </div>
  );
}
