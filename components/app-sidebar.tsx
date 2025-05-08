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

// This is sample data.
const data = {
  user: {
    name: 'Joshua Nwosu',
    email: 'josh@talenttrace.io',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'TalentTrace',
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
          title:
            'Software Engineers in Nigeria working at Series B companies, skilled in Javascript and  React Native',
          url: '/dashboard/history/1',
        },
        {
          title:
            'Marketing Manager in Europe, German-speaking, working at a large enterprise',
          url: '/dashboard/history/2',
        },
      ],
    },
    { title: 'CV Screening', url: '/dashboard/cv-screening', icon: FileUser },
    {
      title: 'Job Board',
      url: '/dashboard/job-board',
      icon: Briefcase,
    },
    {
      title: 'Emails',
      url: '/dashboard/emails',
      icon: Mail,
    },
    {
      title: 'Integrations',
      url: '/dashboard/integrations',
      icon: Frame,
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: 'Emails',
      url: '/emails',
      icon: Mail,
    },
    {
      name: 'Integrations',
      url: '/integrations',
      icon: Frame,
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='border-b'>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
