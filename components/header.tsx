'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NavActions } from './nav-actions';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowRightIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingDialog } from './shared/pricing-dialog';

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((x) => x);

  const nameMap: { [key: string]: string } = {
    search: 'Search',
    history: 'History',
    shortlist: 'Shortlist',
    'job-board': 'Job Board',
    'cv-screening': 'CV Screening',
    emails: 'Emails',
    integrations: 'Integrations',
    analytics: 'Analytics',
    settings: 'Settings',
  };

  const [showPricing, setShowPricing] = useState(false);

  return (
    <header className='sticky top-0 bg-background flex min-h-[65px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-10 justify-between'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            {/* Dashboard as root link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Only show the first segment after dashboard, if it exists */}
            {pathSegments.length > 1 && (
              <>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {nameMap[pathSegments[1]] || pathSegments[1]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='flex items-center gap-4 px-3'>
        <div className='flex items-center gap-4 bg-background border px-4 py-2 text-sm text-muted-foreground'>
          <Sparkles className='w-4 h-4' />
          <span>You're currently on the free trial</span>
          <Button
            className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white cursor-pointer'
            onClick={() => setShowPricing(true)}
          >
            Upgrade <ArrowRightIcon />
          </Button>
        </div>

        <NavActions />
      </div>

      <PricingDialog open={showPricing} onOpenChange={setShowPricing} />
    </header>
  );
}
