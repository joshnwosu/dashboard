'use client';

import * as React from 'react';
import {
  FileText,
  Headset,
  HelpCircle,
  Link,
  Notebook,
  Settings2,
  SettingsIcon,
  ShieldAlert,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ModeToggle } from './mode-toggle';
import { NotificationPopup } from './notification-popup';

const data = [
  [{ label: 'Settings', icon: Settings2 }],
  [
    { label: "What's New", icon: Notebook },
    { label: 'FAQs', icon: HelpCircle },
    { label: 'Support Center', icon: Headset },
    { label: 'Security', icon: ShieldAlert },
    { label: 'Privacy Policy', icon: FileText },
    { label: 'Terms', icon: FileText },
    { label: '@sourzer', icon: Link },
  ],
];

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className='flex items-center gap-4 text-sm'>
      <NotificationPopup />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='gap-4 data-[state=open]:bg-accent'
            size='icon'
          >
            <SettingsIcon className='size-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-56 overflow-hidden rounded-lg p-0'
          align='end'
        >
          <Sidebar collapsible='none' className='bg-transparent'>
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className='border-b last:border-none'>
                  <SidebarGroupContent className='gap-0'>
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
      <ModeToggle />
    </div>
  );
}
