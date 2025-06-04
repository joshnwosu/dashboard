'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LexicalInput } from '@/components/lexical-input';
import { submitJobDescription } from '@/services/job-service';
import { toast } from 'sonner';

export default function CvScreening() {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSend = useCallback(
    async (prompt: string) => {
      setIsSubmitting(true);

      try {
        const response = await submitJobDescription({
          job_description: prompt,
        });

        const jobId = response.data.id;

        // Show success toast
        toast.success('Job description submitted successfully!');

        // Navigate to CV upload page after 1.5 seconds
        setTimeout(() => {
          router.push(`/dashboard/cv-screening/upload-cvs?id=${jobId}`);
        }, 50);
      } catch (error) {
        console.error('Error submitting job description:', error);
        toast.error('Failed to submit job description', {
          description: 'Please try again.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-col flex-1 justify-center items-center px-4'>
        <div className='w-full max-w-4xl space-y-8'>
          <div className='text-center'>
            <p className='text-gray-500'>
              Paste your job description below to get started
            </p>
          </div>

          <LexicalInput
            placeholder='Enter, Paste or Upload Job Description ...'
            content={input}
            onInputChange={setInput}
            onSend={handleSend}
            showIntegrations={false}
            loading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
