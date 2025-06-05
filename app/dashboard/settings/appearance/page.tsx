'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AppearanceSettings() {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Language
        </h3>
        <Select>
          <SelectTrigger className='w-full h-12'>
            <SelectValue placeholder='Select Language' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              <SelectItem value='english'>English</SelectItem>
              <SelectItem value='spanish'>Spanish</SelectItem>
              <SelectItem value='french'>French</SelectItem>
              <SelectItem value='german'>German</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Display
        </h3>
        <div className='space-y-3'>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              className='rounded text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600'
              defaultChecked
            />
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              Show animations
            </span>
          </label>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              className='rounded text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600'
            />
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              Reduce motion
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
