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
  ArrowRightIcon,
  Lightbulb,
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
import { Button } from '@/components/ui/button';
import { PricingDialog } from '@/components/shared/pricing-dialog';

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
      'Remote Software Engineer with 5+ years in fintech, skilled in Python, JavaScript, AWS, based in Nigeria.',
    icon: CodeXml,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'UI/UX Designer',
    prompt:
      'Full time UI/UX Designer with 2+ years in fintech, skilled in Figma, Adobe XD, usability testing, Asia.',
    icon: Snowflake,
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Marketing Manager',
    prompt:
      'Part time Marketing Manager with 3+ years in fintech, experienced in digital marketing, SEO, strategy, Europe.',
    icon: Headset,
    gradient: 'from-orange-500 to-red-600',
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
  const [showPricing, setShowPricing] = useState(false);

  // Access store
  const {
    searchHistory,
    sourceCandidate,
    fetchSearchHistory,
    loading, // This is the loading state from your store
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
            `/dashboard/history/search-history/${encodeURIComponent(
              res.title
            )}?id=${res.id}`
          );
        } else {
          throw new Error('Invalid response from sourceCandidate');
        }
      } catch (error) {
        // Error is handled by the store and displayed via useEffect
        console.error('Error sourcing candidate:', error);
      }
    },
    [areAllBadgesActive, sourceCandidate, toastId, router, fetchSearchHistory]
  );

  return (
    <div className='flex flex-1 flex-col items-center justify-end gap-3 px-4 py-2 max-w-6xl mx-auto'>
      <div className='flex flex-col items-center text-3xl mb-4'>
        <h2 className='text-4xl tracking-tighter font-bold bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-center'>
          Ask Sourzer
        </h2>
      </div>

      <LexicalInput
        placeholder='Describe your ideal candidate...'
        content={input}
        onInputChange={setInput}
        onSend={handleSend}
        loading={loading}
        isSendAllowed={areAllBadgesActive}
      />

      <div className='flex gap-2 items-center justify-center'>
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
                    'select-none text-xs'
                  )}
                >
                  <badge.icon className='mr-2 scale' />
                  {String(badge.title)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side='bottom'>
                <p className='text-xs'>{badgeTooltips[badge.title]}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {false && (
        <div className='flex items-center justify-center space-x-2'>
          <div className='h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 ease-out'
              style={{
                width: `${
                  (Object.values(activeBadges).filter(Boolean).length /
                    badges.length) *
                  100
                }%`,
              }}
            />
          </div>
          <span className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
            {Object.values(activeBadges).filter(Boolean).length}/{badges.length}
          </span>
        </div>
      )}

      <div className='w-full max-w-6xl mt-8'>
        <div className='text-center mb-8'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
            Quick Start Templates
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Try these popular search examples to get started
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {samplePrompt.map((card, index) => (
            <Card
              key={card.title}
              className={cn(
                'group relative p-5 cursor-pointer bg-white/80 dark:bg-sidebar backdrop-blur-sm border shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 overflow-hidden',
                loading && 'pointer-events-none opacity-60' // Disable cards when loading
              )}
              onClick={() => !loading && handleCardClick(card.prompt)} // Prevent clicks when loading
              style={{
                animationDelay: `${index * 1500}ms`,
              }}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                  card.gradient
                )}
              />

              <div className='relative z-10 space-y-4'>
                <div
                  className={cn(
                    'flex w-8 h-8 items-center justify-center rounded-sm bg-gradient-to-br shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 text-white',
                    card.gradient
                  )}
                >
                  <card.icon className='w-3 h-3' />
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300'>
                    {card.title}
                  </CardTitle>
                  <CardDescription className='text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'>
                    {card.prompt}
                  </CardDescription>
                </div>
              </div>
              <div className='absolute inset-0 rounded-xl border-1 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-colors duration-300' />
            </Card>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-4 bg-background border px-4 py-2 text-sm mt-8 text-muted-foreground shadow-2xl '>
        <Sparkles className='w-4 h-4' />
        <span>You're currently on the free trial</span>
        <Button
          className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white cursor-pointer'
          onClick={() => setShowPricing(true)}
        >
          Upgrade to Pro <ArrowRightIcon />
        </Button>
      </div>

      <PricingDialog open={showPricing} onOpenChange={setShowPricing} />
    </div>
  );
}
