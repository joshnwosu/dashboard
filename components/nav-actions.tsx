'use client';

import * as React from 'react';
import {
  FileText,
  Headset,
  HelpCircle,
  LinkIcon,
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
import { useSettingsStore } from '@/store/settingsStore';
import { useRouter } from 'next/navigation';

const data = [
  [{ label: 'Settings', icon: Settings2 }],
  [
    { label: "What's New", icon: Notebook, url: 'https://www.sourzer.co' },
    { label: 'FAQs', icon: HelpCircle, url: 'https://www.sourzer.co' },
    { label: 'Support Center', icon: Headset, url: 'mailto:help@sourzer.co' },
    { label: 'Security', icon: ShieldAlert, url: 'https://www.sourzer.co' },
    {
      label: 'Privacy Policy',
      icon: FileText,
      url: 'https://www.sourzer.co/privacy-policy',
    },
    {
      label: 'Terms',
      icon: FileText,
      url: 'https://www.sourzer.co/terms-of-service',
    },
    {
      label: '@sourzer',
      icon: LinkIcon,
      url: 'https://www.linkedin.com/company/sourzer',
    },
  ],
];

export function NavActions() {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { setIsOpen } = useSettingsStore();

  const handleMenuItemClick = (label: string) => {
    if (label === 'Settings') {
      // setIsOpen(true); // Open SettingsDialog
      router.push('/dashboard/settings/account');
      setIsPopoverOpen(false); // Close Popover
    } else {
      // Handle other menu items (e.g., navigate or log)
      console.log(`Clicked: ${label}`);
    }
  };

  return (
    <div className='flex items-center gap-4 text-sm'>
      <NotificationPopup />
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
          className='w-48 overflow-hidden rounded-lg p-0'
          align='end'
        >
          <Sidebar collapsible='none' className='bg-transparent'>
            <SidebarContent className='gap-0'>
              {data.map((group, index) => (
                <SidebarGroup key={index} className='border-b last:border-none'>
                  <SidebarGroupContent className='gap-0'>
                    <SidebarMenu>
                      {group.map((item, index) => (
                        // @ts-ignore
                        <a href={item?.url!} key={index}>
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                              asChild
                              onClick={() => handleMenuItemClick(item.label)}
                            >
                              <button>
                                <item.icon /> <span>{item.label}</span>
                              </button>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </a>
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
