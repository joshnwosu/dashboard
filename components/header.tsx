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
import React from 'react';

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

  return (
    <header className='sticky top-0 bg-background flex h-[65px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b'>
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
      <div className='ml-auto px-3'>
        <NavActions />
      </div>
    </header>
  );
}
