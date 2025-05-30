'use client';

import * as React from 'react';
import { Bell, Shield, CreditCard, Palette, User, Coins } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const data = {
  nav: [
    { name: 'Account', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Credits', icon: Coins },
    { name: 'Plans & Billing', icon: CreditCard },
    { name: 'Appearance', icon: Palette },
  ],
};

type SettingsSection = {
  title: string;
  content: React.ReactNode;
};

type SettingsSectionKey =
  | 'Account'
  | 'Security'
  | 'Credits'
  | 'Plans & Billing'
  | 'Appearance';

const settingsContent: Record<SettingsSectionKey, SettingsSection> = {
  Account: {
    title: 'Account Settings',
    content: (
      <div className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Profile Information
          </h3>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                  First Name
                </label>
                <Input type='text' placeholder='John' className='h-12' />
              </div>
              <div>
                <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                  Last Name
                </label>
                <Input type='text' placeholder='Doe' className='h-12' />
              </div>
            </div>
            <div>
              <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                Email
              </label>
              <Input
                type='email'
                placeholder='john.doe@example.com'
                className='h-12'
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  Security: {
    title: 'Security Settings',
    content: (
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

              <Input type='password' className='h-12' />
            </div>
            <div>
              <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                New Password
              </label>
              <Input type='password' className='h-12' />
            </div>
            <button className='rounded-md bg-blue-600 dark:bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors'>
              Update Password
            </button>
          </div>
        </div>
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
      </div>
    ),
  },
  Credits: {
    title: 'Credits',
    content: (
      <div>
        <p>Credit History</p>
      </div>
    ),
  },
  'Plans & Billing': {
    title: 'Plans & Billing',
    content: (
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
    ),
  },
  Appearance: {
    title: 'Appearance Settings',
    content: (
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
    ),
  },
};

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeSection, setActiveSection] =
    React.useState<SettingsSectionKey>('Account');

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className='relative bg-background rounded-lg shadow-xl max-w-[1000px] w-full mx-4 max-h-[80vh] overflow-hidden border'>
        <div className='flex h-[600px]'>
          {/* Sidebar */}
          <div className='w-64 bg-sidebar border-r dark:border-sidebar-accent'>
            <div className='p-4'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Settings
              </h2>
              <nav className='space-y-1'>
                {data.nav.map((item) => (
                  <button
                    key={item.name}
                    onClick={() =>
                      setActiveSection(item.name as SettingsSectionKey)
                    }
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeSection === item.name
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className='h-5 w-5' />
                    <span className='text-sm font-medium'>{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1 flex flex-col'>
            {/* Header */}
            <div className='border-b px-6 py-4'>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                  {settingsContent[activeSection]?.title}
                </h1>
                <button
                  onClick={() => onOpenChange(false)}
                  className='text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none'
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto p-6'>
              {settingsContent[activeSection]?.content}
            </div>

            {/* Footer */}
            <div className='border-t px-6 py-4 flex justify-end space-x-3'>
              <button
                onClick={() => onOpenChange(false)}
                className='px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              >
                Cancel
              </button>
              <button className='px-4 py-2 text-sm bg-blue-600 dark:bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors'>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
