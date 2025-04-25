'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  AudioLines,
  Award,
  Check,
  CodeXml,
  Headset,
  Locate,
  Mic,
  SearchIcon,
  SendHorizonal,
  SlidersHorizontal,
  Snowflake,
  Sparkle,
  User,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { analyzePrompt, BadgeStates } from '@/utils/analyzePrompt';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { EditSearchFilter } from '@/components/edit-search-filter';

// Define custom Badge variants for highlighting
const badgeVariants = {
  outline: 'px-4 py-2 rounded-full',
  active:
    'px-4 py-2 rounded-full bg-green-200 text-white border-green-900  text-green-900',
};

// Define interface for badge objects
interface BadgeItem {
  title: keyof BadgeStates; // Restrict title to BadgeStates keys
  icon: any; // Use specific icon type if possible (e.g., from lucide-react)
}

// Define interface for action button objects
interface ActionButton {
  title: string;
  icon: any; // Use specific icon type if possible
  tooltip: string; // Add tooltip property
}

export default function Search() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [activeBadges, setActiveBadges] = useState<BadgeStates>({
    Location: false,
    Skills: false,
    Experience: false,
    Industry: false,
    'Job Title': false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const badges: BadgeItem[] = [
    { title: 'Location', icon: Locate },
    { title: 'Job Title', icon: User },
    { title: 'Experience', icon: Award },
    { title: 'Industry', icon: '' },
    { title: 'Skills', icon: Sparkle },
  ];

  const searchBtns = [
    {
      title: 'Edit Filters',
      icon: SlidersHorizontal,
      onClick: () => setIsDialogOpen(true),
    },
    { title: 'Continue Search', icon: SearchIcon },
  ];

  const actionButtons: ActionButton[] = [
    {
      title: 'Dictate',
      icon: Mic,
      tooltip: 'Record your prompt using voice input',
    },
    {
      title: 'Send',
      icon: textareaValue ? SendHorizonal : AudioLines, // Dynamic icon based on textareaValue
      tooltip: textareaValue ? 'Send your prompt' : 'Use voice mode',
    },
  ];

  const samplePrompt = [
    {
      title: 'Software Engineer',
      prompt:
        'Software Engineer with 5+ years of experience developing scalable applications at fintech companies in the Bay Area, proficient in Python, JavaScript, and cloud technologies like AWS.',
      icon: CodeXml,
      color: 'bg-blue-500',
    },
    {
      title: 'Ui/Ux Designer',
      prompt:
        'UI/UX Designer with 2+ years of experience creating user-centered designs for fintech products in the Bay Area, skilled in Figma, Adobe XD, and usability testing.',
      icon: Snowflake,
      color: 'bg-yellow-600',
    },
    {
      title: 'Marketing Manager',
      prompt:
        'Marketing Manager with 3+ years of experience driving brand growth for fintech startups in the Bay Area, specializing in digital marketing, SEO, and campaign strategy.',
      icon: Headset,
      color: 'bg-red-600',
    },
  ];

  // Handle card click to populate textarea
  const handleCardClick = (prompt: string) => {
    setTextareaValue(prompt);
    setActiveBadges(analyzePrompt(prompt));
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle container click to focus textarea
  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

  // Adjust textarea height and analyze prompt on change
  useEffect(() => {
    const textarea = textareaRef.current;
    const adjustHeight = () => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    if (textarea) {
      textarea.addEventListener('input', adjustHeight);
    }
    adjustHeight();

    // Analyze prompt whenever textareaValue changes
    setActiveBadges(analyzePrompt(textareaValue));

    return () => {
      if (textarea) {
        textarea.removeEventListener('input', adjustHeight);
      }
    };
  }, [textareaValue]);

  return (
    <div className='flex flex-1 flex-col items-center justify-end gap-4 px-4 py-10 max-w-6xl mx-auto'>
      <div className='flex flex-col items-center text-3xl mb-6'>
        <p>Hi, I'm TalentTrace.</p>
        <p className='text-muted-foreground text-xl mt-4'>
          Who are you looking for?
        </p>
      </div>
      <div
        className='mx-auto w-full max-w-3xl rounded-3xl bg-muted dark:bg-sidebar p-4 border border-border cursor-text'
        onClick={handleContainerClick}
      >
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          className='w-full mt-4 border-0 bg-transparent dark:bg-input/0 shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-none resize-none overflow-y-auto text-base leading-6'
          style={{ height: '25px', maxHeight: '120px' }}
          placeholder='Software Engineer with 5+ years of experience at fintech companies in the Bay Area'
        />

        <div className='flex justify-between items-baseline'>
          <div className='flex gap-2'>
            {searchBtns.map((btn, index) => (
              <Button
                key={index.toString()}
                variant='outline'
                className='rounded-full cursor-pointer'
                disabled={!textareaValue}
                onClick={btn.onClick}
              >
                {btn.title}
                <btn.icon className='ml-2 size-4' />
              </Button>
            ))}
          </div>

          <div className='flex gap-2'>
            <TooltipProvider>
              {actionButtons.map((btn, index) => (
                <Tooltip key={index.toString()}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={btn.title === 'Send' ? 'default' : 'outline'}
                      className='w-10 h-10 rounded-full cursor-pointer'
                    >
                      <btn.icon className='size-5' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-md'>{btn.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>

      <EditSearchFilter
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={() => console.log('Saving filter...')}
      />

      <div className='flex gap-4 items-center justify-center'>
        {badges.map((badge, index) => (
          <Badge
            key={index.toString()}
            variant={activeBadges[badge.title] ? 'default' : 'outline'}
            className={
              activeBadges[badge.title]
                ? badgeVariants.active
                : badgeVariants.outline
            }
          >
            {badge.icon ? (
              <badge.icon className='mr-2 scale-150' />
            ) : (
              <Check className='mr-2 scale-150' />
            )}
            {String(badge.title)}
          </Badge>
        ))}
      </div>

      <div className='md:grid grid-cols-3 gap-6 mt-4 hidden'>
        {samplePrompt.map((card, index) => (
          <Card
            key={index.toString()}
            className='p-6 cursor-pointer'
            onClick={() => handleCardClick(card.prompt)}
          >
            <div
              className={cn(
                'flex aspect-square size-10 items-center justify-center rounded-lg bg-red-600 text-sidebar-primary-foreground',
                card.color
              )}
            >
              <card.icon className='size-5' />
            </div>

            <CardTitle>
              <span>{card.title}</span>
            </CardTitle>
            <CardDescription className='text-md'>
              <span>{card.prompt}</span>
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
