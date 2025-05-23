'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Locate,
  Award,
  Sparkle,
  User,
  Sparkles,
  Check,
  CodeXml,
  Snowflake,
  Headset,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { analyzePrompt, BadgeStates } from '@/utils/analyzePrompt';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LexicalInput } from '@/components/lexical-input';
import { toast } from 'sonner';
import { useJobStore } from '@/store/jobStore';
import { useRouter } from 'next/navigation';
import { SourceCandidateResponse } from '@/types/job';

// Define badge variants
const badgeVariants = {
  outline: 'px-4 py-2 rounded-full',
  active:
    'px-4 py-2 rounded-full bg-green-200 text-white border-green-900 text-green-900',
};

// Define interfaces
interface BadgeItem {
  title: keyof BadgeStates;
  icon: any;
}

const samplePrompt = [
  {
    title: 'Software Engineer',
    prompt:
      'Software Engineer with 5+ years in fintech, skilled in Python, JavaScript, AWS, based in Nigeria.',
    icon: CodeXml,
  },
  {
    title: 'UI/UX Designer',
    prompt:
      'UI/UX Designer with 2+ years in fintech, skilled in Figma, Adobe XD, usability testing, Asia.',
    icon: Snowflake,
  },
  {
    title: 'Marketing Manager',
    prompt:
      'Marketing Manager with 3+ years in fintech, experienced in digital marketing, SEO, strategy, Europe.',
    icon: Headset,
  },
];

const badges: BadgeItem[] = [
  { title: 'Location', icon: Locate },
  { title: 'Job Title', icon: User },
  { title: 'Experience', icon: Award },
  { title: 'Industry', icon: Check },
  { title: 'Skills', icon: Sparkle },
  { title: 'Job Type', icon: Sparkles },
];

// Define tooltip descriptions for badges
const badgeTooltips: Record<keyof BadgeStates, string> = {
  Location: 'E.g., Nigeria',
  'Job Title': 'E.g., Software Engineer, UI/UX Designer',
  Experience: 'E.g., 5+ years',
  Industry: 'E.g., Fintech, Healthcare',
  Skills: 'E.g., Python, Figma',
  'Job Type': 'E.g., Full Time, Remote, On-site, Part Time',
};

export default function Search() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [activeBadges, setActiveBadges] = useState<BadgeStates>({
    Location: false,
    Skills: false,
    Experience: false,
    Industry: false,
    'Job Title': false,
    'Job Type': false,
  });
  const [updateEditorContent, setUpdateEditorContent] =
    useState<(content: string) => void | undefined>();
  const [toastId, setToastId] = useState<string | number | undefined>(
    undefined
  );

  // Access store
  const {
    searchHistory,
    sourceCandidate,
    fetchSearchHistory,
    loading,
    error,
    clearError,
  } = useJobStore();

  // Check if all badges are active
  const areAllBadgesActive = useCallback(() => {
    return Object.values(activeBadges).every((isActive) => isActive);
  }, [activeBadges]);

  // Handle card click
  const handleCardClick = useCallback(
    (prompt: string) => {
      setInput(prompt);
      setActiveBadges(analyzePrompt(prompt));
      updateEditorContent?.(prompt);
    },
    [updateEditorContent]
  );

  // Analyze prompt on change
  useEffect(() => {
    setActiveBadges(analyzePrompt(input));
  }, [input]);

  // Handle error and loading states
  useEffect(() => {
    if (loading && !toastId) {
      // Show loading toast and store its ID
      const id = toast.loading('Sourcing candidate...');
      setToastId(id);
    } else if (!loading && toastId) {
      // Dismiss loading toast when loading is complete
      toast.dismiss(toastId);
      setToastId(undefined);
    }

    if (error) {
      // Dismiss loading toast if present
      if (toastId) {
        toast.dismiss(toastId);
        setToastId(undefined);
      }
      toast.error(error);
      clearError(); // Clear error after displaying
    }
  }, [loading, error, toastId, clearError]);

  // Handle send action
  const handleSend = useCallback(
    async (prompt: string) => {
      if (!areAllBadgesActive()) {
        toast.warning('Cannot send: Not all badges are active');
        return;
      }

      try {
        const res = (await sourceCandidate({
          job_description: prompt,
          search_github: true,
          search_indeed: false,
          search_linkedin: false,
        })) as any;
        // Dismiss loading toast if present
        if (toastId) {
          toast.dismiss(toastId);
          setToastId(undefined);
        }
        toast.success('Candidate sourced successfully!');

        // Navigate to search history page
        // `history/[slug]/[title]`
        if (res) {
          // Fetch search history after successful sourcing
          await fetchSearchHistory(); // Uses default page=1, perPage=15
          router.push(
            `/dashboard/history/search-history/${encodeURIComponent(res.title)}`
          );
          toast.success('Candidate sourced successfully!');
        } else {
          throw new Error('Invalid response from sourceCandidate');
        }
      } catch (error) {
        // Error is handled by the store and displayed via useEffect
      }
    },
    [areAllBadgesActive, sourceCandidate, toastId]
  );

  return (
    <div className='flex flex-1 flex-col items-center justify-end gap-3 px-4 py-2 max-w-6xl mx-auto'>
      <div className='flex flex-col items-center text-3xl mb-6'>
        <h2 className='text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-center'>
          Who are you looking for?
        </h2>
      </div>

      <LexicalInput
        placeholder='Ask Sourzer'
        content={input}
        onInputChange={setInput}
        onSend={handleSend}
        // isSendAllowed={areAllBadgesActive}
      />

      <div className='flex gap-4 items-center justify-center'>
        <TooltipProvider>
          {badges.map((badge, index) => (
            <Tooltip key={index.toString()}>
              <TooltipTrigger asChild>
                <Badge
                  variant={activeBadges[badge.title] ? 'default' : 'outline'}
                  className={cn(
                    activeBadges[badge.title]
                      ? badgeVariants.active
                      : badgeVariants.outline,
                    'select-none'
                  )}
                >
                  <badge.icon className='mr-2 scale-150' />
                  {String(badge.title)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-md'>{badgeTooltips[badge.title]}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div className='md:grid grid-cols-3 gap-6 mt-4 hidden'>
        {samplePrompt.map((card, index) => (
          <Card
            key={index.toString()}
            className='p-6 cursor-pointer hover:bg-muted'
            onClick={() => handleCardClick(card.prompt)}
          >
            <div
              className={cn(
                'flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'
              )}
            >
              <card.icon className='size-4' />
            </div>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription className='text-md'>{card.prompt}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
