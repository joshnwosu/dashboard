'use client';

import { Input } from '@/components/ui/input';

export default function SecuritySettings() {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Password
        </h3>
        <div className='space-y-3'>
          <div>
            <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
              Current Password
            </label>
            <Input type='password' />
          </div>
          <div>
            <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
              New Password
            </label>
            <Input type='password' />
          </div>
          <button className='rounded-md bg-blue-600 dark:bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors'>
            Update Password
          </button>
        </div>
      </div>
      {false && (
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Two-Factor Authentication
          </h3>
          <div className='space-y-3'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Add an extra layer of security to your account
            </p>
            <button className='rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
              Enable 2FA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
