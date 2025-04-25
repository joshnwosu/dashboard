'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Briefcase,
  Building,
  Building2,
  DollarSign,
  Globe,
  GraduationCap,
  MapPin,
  MoveRight,
  Settings,
  Sparkle,
} from 'lucide-react';

interface EditSearchFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function EditSearchFilter({
  open,
  onOpenChange,
  onSave,
}: EditSearchFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const checkboxRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Handle save
  const handleSave = () => {
    onSave();
    onOpenChange(false);
  };

  // Handle sidebar category click
  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
    const checkbox = checkboxRefs.current[key];
    if (checkbox) {
      checkbox.focus();
      // Optionally scroll to the checkbox if it's not in view
      checkbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const sideBarItems = [
    { title: 'General', icon: Settings },
    { title: 'Location', icon: MapPin },
    { title: 'Jobs', icon: Briefcase },
    { title: 'Company', icon: Building },
    { title: 'Industry', icon: Building2 },
    { title: 'Funding & Revenue', icon: DollarSign },
    { title: 'Skills', icon: Sparkle },
    { title: 'Education', icon: GraduationCap },
    { title: 'Languages', icon: Globe },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[1100px] flex flex-col h-[80vh] p-0 gap-0 [&>button]:hidden dark:bg-sidebar'>
        <DialogHeader className='flex flex-row justify-between items-center p-4 border-b border-b-border'>
          <DialogTitle className='text-md'>Edit Search Filters</DialogTitle>

          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={handleSave}
          >
            Save changes <MoveRight className='ml-2' />
          </Button>
        </DialogHeader>
        <div className='flex flex-1 overflow-hidden'>
          {/* Sidebar */}
          <div className='w-1/4 border-r border-border p-4'>
            <ScrollArea className='h-full'>
              <ul className='space-y-1'>
                {sideBarItems.map((item, index) => (
                  <li
                    key={index.toString()}
                    className={cn(
                      'flex items-center text-sm font-medium p-2 rounded-md cursor-pointer hover:bg-accent transition-colors',
                      selectedCategory === item.title &&
                        'bg-accent text-accent-foreground'
                    )}
                    onClick={() => handleCategoryClick(item.title)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCategoryClick(item.title);
                        e.preventDefault();
                      }
                    }}
                    aria-label={`Select ${item.title} category`}
                  >
                    <item.icon className='size-4 mr-4' />
                    {item.title}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
          {/* Main Content */}
          <ScrollArea className='flex-1 p-4'>
            <div className='grid gap-4'>{/* content goes here */}</div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
