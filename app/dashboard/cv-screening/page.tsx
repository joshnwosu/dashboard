'use client';

import React, { useCallback, useState } from 'react';
import TitleDescription from '@/components/title-description';
import { LexicalInput } from '@/components/lexical-input';

export default function CvScreening() {
  const [input, setInput] = useState('');

  const handleSend = useCallback((prompt: string) => {
    console.log('Prompt: ', prompt);
  }, []);

  return (
    <div className='flex flex-1 flex-col'>
      <TitleDescription
        title='CV Screening'
        description='Easily upload job description for screening'
      />

      <div className='flex flex-col flex-1 justify-end'>
        <LexicalInput
          placeholder='Enter, Paste or Upload Job Description ...'
          content={input}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
