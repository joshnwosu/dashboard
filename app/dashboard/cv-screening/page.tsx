// 'use client';

// import React, { useCallback, useState } from 'react';
// import TitleDescription from '@/components/title-description';
// import { LexicalInput } from '@/components/lexical-input';
// import { submitJobDescription } from '@/services/job-service';

// export default function CvScreening() {
//   const [input, setInput] = useState('');

//   const handleSend = useCallback(async (prompt: string) => {
//     console.log('Prompt: ', prompt);

//     try {
//       const res = await submitJobDescription({
//         job_description: prompt,
//       });
//     } catch (error) {}
//   }, []);

//   return (
//     <div className='flex flex-1 flex-col'>
//       <TitleDescription
//         title='CV Screening'
//         description='Easily upload job description for screening'
//       />

//       <div className='flex flex-col flex-1 justify-end'>
//         <LexicalInput
//           placeholder='Enter, Paste or Upload Job Description ...'
//           content={input}
//           onInputChange={setInput}
//           onSend={handleSend}
//         />
//       </div>
//     </div>
//   );
// }

// Updated app/cv-screening/page.tsx
'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleDescription from '@/components/title-description';
import { LexicalInput } from '@/components/lexical-input';
import { submitJobDescription } from '@/services/job-service';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function CvScreening() {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const router = useRouter();

  const handleSend = useCallback(
    async (prompt: string) => {
      setIsSubmitting(true);

      try {
        const response = await submitJobDescription({
          job_description: prompt,
        });

        // console.log('Res: ', response);

        // Assuming the response contains a job_id
        const jobId = response.data.id;
        setJobId(jobId);
        setJobSubmitted(true);

        // Store job ID for the next screen
        // sessionStorage.setItem('currentJobId', jobId);

        // Navigate to CV upload page after 1.5 seconds
        setTimeout(() => {
          router.push(`/dashboard/cv-screening/upload-cvs?id=${jobId}`);
        }, 1500);
      } catch (error) {
        console.error('Error submitting job description:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  if (jobSubmitted) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <CheckCircle className='h-12 w-12 text-green-500' />
            </div>
            <CardTitle>Job Description Submitted!</CardTitle>
            <CardDescription>
              Redirecting you to upload CVs for screening...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col'>
      <TitleDescription
        title='CV Screening'
        description='Upload or enter a job description to start screening CVs'
      />

      <div className='flex flex-col flex-1 justify-end'>
        <LexicalInput
          placeholder='Enter, Paste or Upload Job Description ...'
          content={input}
          onInputChange={setInput}
          onSend={handleSend}
          showIntegrations={false}
        />
      </div>
    </div>
  );
}
