'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Bookmark,
  Briefcase,
  Command,
  FileUser,
  Frame,
  GalleryVerticalEnd,
  History,
  LayoutDashboard,
  Mail,
  Send,
  Settings2,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Sourzer',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Search',
      url: '/dashboard/search',
      icon: Send,
    },
    { title: 'CV Screening', url: '/dashboard/cv-screening', icon: FileUser },
    {
      title: 'Shortlist',
      url: '/dashboard/shortlist',
      icon: Bookmark,
    },
    {
      title: 'History',
      url: '/dashboard/history',
      icon: History,
      isActive: true,
      items: [
        {
          title: 'Search History',
          url: '/dashboard/history/search-history',
        },
        {
          title: 'CV Screening History',
          url: '/dashboard/history/cv-screening-history',
        },
      ],
    },

    {
      title: 'Job Board',
      // url: '/dashboard/job-board',
      url: '#',
      icon: Briefcase,
      badge: 'Coming Soon',
    },
    {
      title: 'Emails',
      // url: '/dashboard/emails',
      url: '#',
      icon: Mail,
      badge: 'Coming Soon',
    },
    {
      title: 'Integrations',
      url: '/dashboard/integrations',
      icon: Frame,
    },
    // {
    //   title: 'Settings',
    //   url: '/dashboard/settings',
    //   icon: Settings2,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useUserStore();
  return (
    <Sidebar {...props}>
      <SidebarHeader className='border-b'>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
