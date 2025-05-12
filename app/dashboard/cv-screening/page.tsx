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
    <div className='p-4 md:p-6'>
      <TitleDescription
        title='CV Screening'
        description='Easily upload CV for screening'
      />

      <LexicalInput
        content={input}
        onInputChange={setInput}
        onSend={handleSend}
        // isSendAllowed={false}
      />
    </div>
  );
}
