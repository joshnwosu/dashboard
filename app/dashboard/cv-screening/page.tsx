'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';
import { Label } from '@/components/ui/label';
import TitleDescription from '@/components/title-description';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from '@/components/file-upload';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, EditorState } from 'lexical';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { debounce } from 'lodash';
import { Button } from '@/components/ui/button';
import { ArrowUp, Link } from 'lucide-react';

const INITIAL_CONFIG = {
  namespace: 'ChatInput',
  onError: (error: Error) => console.error(error),
};

const DEBOUNCE_DELAY = 30;

export default function CvScreening() {
  const id = useId();
  const [input, setInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvLink, setCvLink] = useState('');

  const [editorInstance, setEditorInstance] = useState<any>(null);

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

  const handleSubmit = () => {
    console.log('Job Description:', jobDescription);
    console.log('CV File:', cvFile);
    console.log('CV Link:', cvLink);
  };

  // Handle container click
  const handleContainerClick = () => {
    editorInstance?.focus();
  };

  const handleSend = useCallback(async (prompt: string) => {
    // Handle send logic

    console.log('Prompt:', prompt);
  }, []);

  return (
    <div className='p-4 md:p-6'>
      <TitleDescription
        title='CV Screening'
        description='Easily upload CV for screening'
      />

      <Tabs defaultValue='jd' className='mt-6 w-full md:w-2xl'>
        <TabsList>
          <TabsTrigger value='jd' className='px-6'>
            Job Description
          </TabsTrigger>
          <TabsTrigger value='upload' className='px-6'>
            Upload CV
          </TabsTrigger>
          <TabsTrigger value='link' className='px-6'>
            <Link className='size-4 mr-2' />
            Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value='jd' className='mt-4'>
          <div className='space-y-4'>
            <div
              className='mx-auto w-full max-w-3xl rounded-3xl bg-muted dark:bg-sidebar p-4 border border-border cursor-text relative h-[470px]'
              onClick={handleContainerClick}
            >
              <LexicalComposer initialConfig={INITIAL_CONFIG}>
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable
                      aria-placeholder='Type your message...'
                      placeholder={
                        <div className='absolute top-8 left-8 text-lg text-gray-400 pointer-events-none flex-1'>
                          Enter or Paste Job Description...
                        </div>
                      }
                      className='relative p-4 bg-accent dark:bg-sidebar outline-0 rounded-2xl h-[400px] overflow-auto text-lg'
                    />
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={debouncedOnChange} />
                <AutoFocusPlugin />
                <HistoryPlugin />
                <EditorPlugin onEditorReady={setEditorInstance} />
              </LexicalComposer>

              <div className='flex justify-end items-baseline mr-8'>
                <Button
                  variant='default'
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={() => handleSend(input)}
                  disabled={!input}
                >
                  <ArrowUp className='size-5' />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='upload' className='mt-4'>
          <FileUpload />
        </TabsContent>

        <TabsContent value='link' className='mt-4'>
          <div className='space-y-4 w-full md:w-md'>
            <Label htmlFor={id} className='pl-2'>
              Paste Link to CV
            </Label>

            <input
              type='url'
              value={cvLink}
              onChange={(e) => setCvLink(e.target.value)}
              placeholder='https://drive.google.com/...'
              className='w-full p-3 border rounded-md'
            />

            <Button
              variant='outline'
              onClick={handleSubmit}
              className='ml-2 cursor-pointer'
            >
              Submit
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
