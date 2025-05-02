'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Bookmark,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  EllipsisVertical,
  Eye,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  Settings2,
  Trash,
  Trash2,
} from 'lucide-react';
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
import { BadgeDelta } from './badge-delta';

export interface ItemProps {
  avatar: string;
  name: string;
  about: string;
  jobTitle: string;
  company: string;
  status: string;
  value?: string;
  type?: 'neutral' | 'increase' | 'decrease' | 'medium';
}

interface CardGridProps {
  items: ItemProps[];
}

const data = [
  [
    {
      label: 'Copy Link',
      icon: Link,
    },
    {
      label: 'Duplicate',
      icon: Copy,
    },
    {
      label: 'Move to',
      icon: CornerUpRight,
    },
    {
      label: 'Move to Trash',
      icon: Trash2,
    },
  ],
];

export default function CardGrid({ items }: CardGridProps) {
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (item: ItemProps, index: number) => {
    const card = cardRefs.current.get(index);
    if (card) {
      setCardBounds(card.getBoundingClientRect());
    }
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setCardBounds(null);
  };

  return (
    <div>
      <p className='text-2xl mb-6 pl-2'>Search Results:</p>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        {items.map((item, index) => (
          <div
            key={index.toString()}
            // className='rounded-xl bg-muted/50 p-8 flex flex-col gap-4 shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-muted'
            className='rounded-xl bg-background ring-2 dark:ring-1 ring-accent p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-muted/50'
            onClick={() => handleCardClick(item, index)}
          >
            <div className='flex justify-between items-start gap-4'>
              <div className='flex gap-4 items-start'>
                <Image
                  src={item.avatar}
                  alt='profile_photo'
                  width={80}
                  height={80}
                  className='rounded-full'
                />
                <div className='flex flex-1 flex-col'>
                  <h2 className='text-md'>{item.name}</h2>
                  <p className='text-sm text-muted-foreground'>
                    {item.jobTitle} @ {item.company}
                  </p>
                  <div className='mt-2 flex gap-4'>
                    <Image
                      src='/images/linkedin.png'
                      alt='Linkedin'
                      width={24}
                      height={24}
                    />
                    <Image
                      src='/images/gmail.png'
                      alt='Gmail'
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className='line-clamp-3 text-md text-muted-foreground'>
              {item.about}
            </p>

            <div className='flex flex-wrap'>
              <BadgeDelta
                variant='complex'
                deltaType={item.type ?? 'increase'}
                iconStyle='line'
                value={item.value ?? '9.3%'}
              />
            </div>
            <div className='flex items-center gap-4 justify-end'>
              <Button variant='outline' className='text-sm'>
                <span>Shortlist</span>
                <Bookmark />
              </Button>
              <Button variant='outline' className='text-sm'>
                <span>Hide</span>
                <Eye />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        <Dialog open={!!selectedItem} onOpenChange={handleClose}>
          <DialogContent className='sm:max-w-[1100px] flex flex-col h-[80vh] p-0 gap-0 [&>button]:hidden dark:bg-sidebar'>
            <DialogHeader className='flex flex-row justify-between items-center p-4 border-b border-b-border'>
              <DialogTitle className='text-md'>More Info</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </div>
  );
}
