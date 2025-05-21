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
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowUp, EllipsisVerticalIcon, UploadIcon, X } from 'lucide-react';

// State to hold the pdfjs library
type PDFJSLib = typeof import('pdfjs-dist');

interface ActionButton {
  title: string;
  icon: any;
  tooltip: string;
  variant?: 'default' | 'outline';
  onClick?: () => void;
}

interface LexicalInputProps {
  placeholder?: string;
  className?: string;
  contentEditableClassName?: string;
  content?: string;
  onInputChange?: (text: string) => void;
  onSend?: (text: string) => void;
  onFileUpload?: (files: File[]) => void;
  isSendAllowed?: () => boolean;
}

export function LexicalInput({
  placeholder = 'Type your message...',
  className,
  contentEditableClassName,
  content,
  onInputChange,
  onSend,
  onFileUpload,
  isSendAllowed,
}: LexicalInputProps) {
  const [input, setInput] = useState('');
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [pdfjsLib, setPdfjsLib] = useState<PDFJSLib | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const DEBOUNCE_DELAY = 30;

  // Load pdfjs-dist client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && !pdfjsLib) {
      import('pdfjs-dist')
        .then((pdfjs) => {
          pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
          setPdfjsLib(pdfjs);
        })
        .catch((error) => {
          console.error('Failed to load pdfjs-dist:', error);
          setParseError('Failed to initialize PDF parser. Please try again.');
        });
    }
  }, [pdfjsLib]);

  // Internal configuration
  const INITIAL_CONFIG = {
    namespace: 'ChatInput',
    onError: (error: Error) => console.error(error),
  };

  // Handle upload button click
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Parse PDF and extract text
  const parsePdf = async (file: File): Promise<string> => {
    if (!pdfjsLib) {
      setParseError('PDF parser not loaded. Please try again.');
      return '';
    }
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item: any) => item.str).join(' ') + ' ';
      }

      setParseError(null);
      return text.trim();
    } catch (error) {
      console.error('Error parsing PDF:', error);
      setParseError(`Failed to parse ${file.name}. Please try another file.`);
      return '';
    }
  };

  // Handle file selection
  const handleFileChange = useCallback(async () => {
    const files = fileInputRef.current?.files;
    if (files && files.length > 0) {
      setIsParsing(true);
      setParseError(null);
      const newFiles = Array.from(files);
      setUploadedFiles((prev) => {
        const updatedFiles = [...prev, ...newFiles];
        onFileUpload?.(updatedFiles);
        return updatedFiles;
      });

      // Parse each PDF and update editor
      for (const file of newFiles) {
        if (file.type === 'application/pdf') {
          const extractedText = await parsePdf(file);
          if (extractedText && editorInstance) {
            editorInstance.update(() => {
              const root = $getRoot();
              root.clear();
              root.append(
                $createParagraphNode().append($createTextNode(extractedText))
              );
            });
            setInput(extractedText);
            onInputChange?.(extractedText);
          }
        }
      }
      setIsParsing(false);
      // Reset file input after processing
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [editorInstance, onFileUpload, onInputChange, pdfjsLib]);

  // Handle file removal
  const handleRemoveFile = useCallback(
    (fileToRemove: File) => {
      setUploadedFiles((prev) => {
        const updatedFiles = prev.filter((file) => file !== fileToRemove);
        onFileUpload?.(updatedFiles);
        return updatedFiles;
      });
      // Clear editor content, input state, and file input
      if (editorInstance) {
        editorInstance.update(() => {
          const root = $getRoot();
          root.clear();
        });
        setInput('');
        onInputChange?.('');
      }
      setIsParsing(false);
      setParseError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [editorInstance, onFileUpload, onInputChange]
  );

  // Internal action buttons
  const configButtons: ActionButton[] = [
    {
      title: 'Upload',
      icon: UploadIcon,
      tooltip: 'Attach',
      variant: 'outline',
      onClick: handleUploadClick,
    },
    {
      title: 'More',
      icon: EllipsisVerticalIcon,
      tooltip: 'View tools',
      variant: 'outline',
      onClick: () => console.log('More button clicked'),
    },
  ];

  // Internal action buttons
  const actionButtons: ActionButton[] = [
    {
      title: 'Send',
      icon: ArrowUp,
      tooltip: 'Send your prompt',
      variant: 'default',
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
        onInputChange?.(text);
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
      onSend?.(prompt);
    },
    [onSend, isSendAllowed, uploadedFiles]
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
        'mx-auto w-full max-w-3xl rounded-4xl bg-muted dark:bg-sidebar border border-border cursor-text relative overflow-hidden p-4',
        className
      )}
      onClick={handleContainerClick}
    >
      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-2'>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className='flex items-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full px-3 py-1 text-sm'
            >
              <span className='truncate max-w-[150px]'>{file.name}</span>
              <Button
                variant='ghost'
                size='sm'
                className='ml-1 p-0 h-5 w-5'
                onClick={() => handleRemoveFile(file)}
                aria-label={`Remove ${file.name}`}
              >
                <X className='size-4' />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {isParsing && (
        <div className='text-sm text-gray-500 mb-2'>Parsing PDF...</div>
      )}

      {/* Parse error message */}
      {parseError && (
        <div className='text-sm text-red-500 mb-2'>{parseError}</div>
      )}

      <div className='relative mb-2'>
        <LexicalComposer initialConfig={INITIAL_CONFIG}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-placeholder={placeholder}
                placeholder={
                  <div className='absolute top-2 left-0 text-md text-gray-400 pointer-events-none flex-1'>
                    {placeholder}
                  </div>
                }
                className={cn(
                  'relative py-2 bg-accent dark:bg-sidebar outline-0 max-h-[300px] overflow-auto text-md',
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
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-4 items-baseline'>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='.pdf'
            multiple
            className='hidden'
          />
          <TooltipProvider>
            <div className='flex gap-2'>
              {configButtons.map((btn, index) => (
                <Tooltip key={index.toString()}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={btn.variant || 'default'}
                      className='w-9 h-9 rounded-full cursor-pointer'
                      onClick={btn.onClick || (() => handleSend(input))}
                      disabled={
                        btn.title === 'Send' &&
                        isSendAllowed &&
                        !isSendAllowed()
                      }
                      aria-label={btn.title}
                    >
                      <btn.icon className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-md'>{btn.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        <div className='flex gap-4 items-baseline'>
          <TooltipProvider>
            <div className='flex gap-4'>
              {actionButtons.map((btn, index) => (
                <Tooltip key={index.toString()}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={btn.variant || 'default'}
                      className='w-9 h-9 rounded-full cursor-pointer'
                      onClick={btn.onClick || (() => handleSend(input))}
                      // disabled={
                      //   btn.title === 'Send' &&
                      //   isSendAllowed &&
                      //   !isSendAllowed()
                      // }
                      disabled={btn.title === 'Send' && content === ''}
                      aria-label={btn.title}
                    >
                      <btn.icon className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-md'>{btn.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
