'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Bookmark,
  Command,
  Frame,
  GalleryVerticalEnd,
  History,
  LayoutDashboard,
  List,
  Mail,
  Map,
  MessageSquare,
  PieChart,
  Search,
  Send,
  Settings2,
  User,
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
      title: 'Explore',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Search',
      url: '/search',
      icon: Send,
    },
    {
      title: 'Shortlist',
      url: 'save',
      icon: Bookmark,
    },
    {
      title: 'Recent search',
      url: '/history',
      icon: History,
    },
    {
      title: 'Job Board',
      url: '#',
      icon: List,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Sequences',
      url: '#',
      icon: Mail,
    },
    {
      name: 'Integrations',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Analytics',
      url: '#',
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
