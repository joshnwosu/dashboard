'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Locate,
  Award,
  Sparkle,
  User,
  SendHorizonal,
  Sparkles,
  Check,
  CodeXml,
  Snowflake,
  Headset,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { analyzePrompt, BadgeStates } from '@/utils/analyzePrompt';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  $getRoot,
  EditorState,
  $createParagraphNode,
  $createTextNode,
} from 'lexical';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { debounce } from 'lodash';

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

interface ActionButton {
  title: string;
  icon: any;
  tooltip: string;
}

const INITIAL_CONFIG = {
  namespace: 'ChatInput',
  onError: (error: Error) => console.error(error),
};

const DEBOUNCE_DELAY = 30;

const actionButtons: ActionButton[] = [
  {
    title: 'Send',
    icon: SendHorizonal,
    tooltip: 'Send your prompt',
  },
];

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
  'Job Type': 'E.g., Remote, On-site, Part Time',
};

export default function Search() {
  const [input, setInput] = useState('');
  const [activeBadges, setActiveBadges] = useState<BadgeStates>({
    Location: false,
    Skills: false,
    Experience: false,
    Industry: false,
    'Job Title': false,
    'Job Type': false,
  });

  // Check if all badges are active
  const areAllBadgesActive = useCallback(() => {
    return Object.values(activeBadges).every((isActive) => isActive);
  }, [activeBadges]);

  // Custom plugin to access editor instance
  const EditorPlugin = ({
    onEditorReady,
  }: {
    onEditorReady: (editor: any) => void;
  }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      onEditorReady(editor);
    }, [editor, onEditorReady]);
    return null;
  };

  const [editorInstance, setEditorInstance] = useState<any>(null);

  // Handle card click
  const handleCardClick = useCallback(
    (prompt: string) => {
      if (editorInstance) {
        editorInstance.update(() => {
          const root = $getRoot();
          root.clear();
          root.append($createParagraphNode().append($createTextNode(prompt)));
        });
        setInput(prompt);
        setActiveBadges(analyzePrompt(prompt));
        editorInstance.focus();
      }
    },
    [editorInstance]
  );

  // Handle container click
  const handleContainerClick = () => {
    editorInstance?.focus();
  };

  // Analyze prompt on change
  useEffect(() => {
    setActiveBadges(analyzePrompt(input));
  }, [input]);

  const debouncedOnChange = useCallback(
    debounce((editorState: EditorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent().trim();
        setInput(text);
      });
    }, DEBOUNCE_DELAY),
    []
  );

  const handleSend = useCallback(
    async (prompt: string) => {
      // Handle send logic
      if (!areAllBadgesActive()) {
        console.log('Cannot send: Not all badges are active');
        return;
      }
      console.log('Prompt:', prompt);
    },
    [areAllBadgesActive]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (areAllBadgesActive()) {
          handleSend(input);
        } else {
          console.log('Cannot send: Not all badges are active');
        }
      }
    },
    [handleSend, input, areAllBadgesActive]
  );

  return (
    <div className='flex flex-1 flex-col items-center justify-end gap-3 px-4 py-2 max-w-6xl mx-auto'>
      <div className='flex flex-col items-center text-3xl mb-6'>
        <p className='text-xl'>Who are you looking for?</p>
      </div>
      <div
        className='mx-auto w-full max-w-3xl rounded-3xl bg-muted dark:bg-sidebar p-4 border border-border cursor-text relative'
        onClick={handleContainerClick}
      >
        <LexicalComposer initialConfig={INITIAL_CONFIG}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-placeholder='Type your message...'
                placeholder={
                  <div className='absolute top-8 left-8 text-lg text-gray-400 pointer-events-none flex-1'>
                    Type your message...
                  </div>
                }
                className='relative p-4 bg-accent dark:bg-sidebar outline-0 rounded-2xl max-h-[200px] overflow-auto text-lg'
                onKeyDown={handleKeyDown}
                value={input}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={debouncedOnChange} />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <EditorPlugin onEditorReady={setEditorInstance} />
        </LexicalComposer>

        <div className='flex justify-end items-baseline'>
          <TooltipProvider>
            {actionButtons.map((btn, index) => (
              <Tooltip key={index.toString()}>
                <TooltipTrigger asChild>
                  <Button
                    variant='default'
                    className='w-10 h-10 rounded-full cursor-pointer'
                    onClick={() => handleSend(input)}
                    disabled={!areAllBadgesActive()}
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
