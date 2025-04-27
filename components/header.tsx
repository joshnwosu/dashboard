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
  const pathnames = pathname.split('/').filter((x) => x);

  const nameMap: { [key: string]: string } = {
    dashboard: 'Dashboard',
    search: 'Search',
    history: 'History',
    shortlist: 'Shortlist',
    jobs: 'Jobs',

    emails: 'Emails',
    intergratins: 'Integrations',
    analytics: 'Analytics',
    settings: 'Settings',
  };

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage>Search</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink asChild>
                <Link href='/'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              return (
                <React.Fragment key={to}>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{nameMap[value] || value}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={to}>{nameMap[value] || value}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='ml-auto px-3'>
        <NavActions />
      </div>
    </header>
  );
}
