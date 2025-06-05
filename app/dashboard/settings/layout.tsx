'use client';

import * as React from 'react';
import { Shield, CreditCard, Palette, User, Coins } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navigation = [
  { name: 'Account', icon: User, path: '/dashboard/settings/account' },
  { name: 'Security', icon: Shield, path: '/dashboard/settings/security' },
  { name: 'Credits', icon: Coins, path: '/dashboard/settings/credits' },
  {
    name: 'Plans & Billing',
    icon: CreditCard,
    path: '/dashboard/settings/billing',
  },
  { name: 'Appearance', icon: Palette, path: '/dashboard/settings/appearance' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to account page if on the root settings path
  React.useEffect(() => {
    if (pathname === '/dashboard/settings') {
      router.push('/dashboard/settings/account');
    }
  }, [pathname, router]);

  return (
    <div className='bg-background'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            Settings
          </h1>
        </div>

        {/* Tabs */}
        <div className='border-b mb-8'>
          <div className='flex space-x-8 -mb-px'>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  pathname === item.path
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <item.icon className='h-5 w-5' />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='py-4'>{children}</div>
      </div>
    </div>
  );
}
