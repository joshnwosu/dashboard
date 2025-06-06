'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Badge } from './ui/badge';

export function NavMain({
  items,
  pathname,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    badge?: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  pathname?: string;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Check if item has sub-items
          const hasSubItems = item.items && item.items.length > 0;
          const isActive =
            pathname === item.url ||
            (item.items &&
              item.items.some((subItem) => subItem.url === pathname));

          return hasSubItems ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      isActive ? 'bg-accent text-accent-foreground' : undefined
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant='secondary'
                        className='ml-auto mr-2 text-xs px-2 py-0.5'
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className='py-2'>
                    {item.items?.map((subItem) => {
                      const isSubItemActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={
                              isSubItemActive
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground'
                            }
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={
                  pathname === item.url
                    ? 'bg-accent text-accent-foreground'
                    : undefined
                }
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span className='flex-1'>{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant='secondary'
                      className='ml-auto text-[10px] px-2 py-0.5 shrink-0 text-muted-foreground'
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
