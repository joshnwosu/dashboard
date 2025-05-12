'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  EditorState,
  $getRoot,
  $createParagraphNode,
  $createTextNode,
} from 'lexical';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SendHorizonal } from 'lucide-react';

interface ActionButton {
  title: string;
  icon: any;
  tooltip: string;
}

interface LexicalInputProps {
  placeholder?: string;
  className?: string;
  contentEditableClassName?: string;
  content?: string; // New prop to set editor content
  onInputChange?: (text: string) => void; // Callback to expose input value
  onSend?: (text: string) => void; // Callback for send action
  isSendAllowed?: () => boolean; // Callback to check if send is allowed
}

export function LexicalInput({
  placeholder = 'Type your message...',
  className,
  contentEditableClassName,
  content,
  onInputChange,
  onSend,
  isSendAllowed,
}: LexicalInputProps) {
  const [input, setInput] = useState('');
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const DEBOUNCE_DELAY = 30;

  // Internal configuration
  const INITIAL_CONFIG = {
    namespace: 'ChatInput',
    onError: (error: Error) => console.error(error),
  };

  // Internal action buttons
  const actionButtons: ActionButton[] = [
    {
      title: 'Send',
      icon: SendHorizonal,
      tooltip: 'Send your prompt',
    },
  ];

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

  // Handle container click to focus editor
  const handleContainerClick = () => {
    editorInstance?.focus();
  };

  // Debounced input change handler
  const debouncedOnChange = useCallback(
    debounce((editorState: EditorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent().trim();
        setInput(text);
        onInputChange?.(text); // Expose input to parent
      });
    }, DEBOUNCE_DELAY),
    [onInputChange]
  );

  // Internal send handler
  const handleSend = useCallback(
    async (prompt: string) => {
      if (isSendAllowed && !isSendAllowed()) {
        console.log('Cannot send: Not all badges are active');
        return;
      }
      onSend?.(prompt); // Notify parent of send action
    },
    [onSend, isSendAllowed]
  );

  // Internal keydown handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (isSendAllowed && !isSendAllowed()) {
          console.log('Cannot send: Not all badges are active');
          return;
        }
        handleSend(input);
      }
    },
    [handleSend, input, isSendAllowed]
  );

  // Update editor content when content prop changes
  useEffect(() => {
    if (editorInstance && content !== undefined && content !== input) {
      editorInstance.update(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode().append($createTextNode(content)));
      });
      setInput(content);
      editorInstance.focus();
    }
  }, [editorInstance, content, input]);

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-3xl rounded-3xl bg-muted dark:bg-sidebar p-4 border border-border cursor-text relative',
        className
      )}
      onClick={handleContainerClick}
    >
      <LexicalComposer initialConfig={INITIAL_CONFIG}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-placeholder={placeholder}
              placeholder={
                <div className='absolute top-8 left-8 text-lg text-gray-400 pointer-events-none flex-1'>
                  {placeholder}
                </div>
              }
              className={cn(
                'relative p-4 bg-accent dark:bg-sidebar outline-0 rounded-2xl max-h-[200px] overflow-auto text-lg',
                contentEditableClassName
              )}
              onKeyDown={handleKeyDown}
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
                  disabled={isSendAllowed && !isSendAllowed()}
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
  );
}
