// app/cv-screening/upload-cvs/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TitleDescription from '@/components/title-description';
import { CVUploadZone } from '@/components/cv-upload-zone';
import { CVList } from '@/components/cv-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { addCvToJob } from '@/services/job-service';
import { CVScreeningItem } from '@/types/cv-screening';
import { extractTextFromFile } from '@/utils/file-extractor';

export default function UploadCVs() {
  const router = useRouter();
  const [jobId, setJobId] = useState<string>('');
  const [cvScreenings, setCvScreenings] = useState<CVScreeningItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  // const id = searchParams.get('id')

  // Load job ID and fetch existing CVs
  useEffect(() => {
    const storedJobId = searchParams.get('id');
    if (!storedJobId) {
      router.push('/dashboard/cv-screening');
      return;
    }
    setJobId(storedJobId);
  }, [router]);

  const handleFileUpload = async (file: File) => {
    if (!jobId) return;

    setIsUploading(true);
    try {
      // Extract text content from the file
      const extractedContent = await extractTextFromFile(file);

      console.log({
        job_id: Number(jobId),
        cv_description: extractedContent,
      });

      await addCvToJob({
        job_id: Number(jobId),
        cv_description: extractedContent,
        // candidate_name: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
      });
    } catch (error) {
      console.error('Error uploading CV:', error);
      // You might want to show an error toast here
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex flex-1 flex-col space-y-6'>
      <div className='flex items-center justify-between'>
        <Button
          variant='ghost'
          onClick={() => router.push('/dashboard/cv-screening')}
          className='gap-2'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Job Description
        </Button>

        <Button
          variant='outline'
          // onClick={fetchCvScreenings}
          disabled={isLoading}
          className='gap-2'
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* <TitleDescription
        title='Upload CVs for Screening'
        description='Upload CVs one by one to screen against your job description'
      /> */}

      <CVUploadZone onFileUpload={handleFileUpload} isUploading={isUploading} />

      {/* <CVList
        cvScreenings={cvScreenings}
        isLoading={isLoading}
        onRefresh={fetchCvScreenings}
      /> */}
    </div>
  );
}
