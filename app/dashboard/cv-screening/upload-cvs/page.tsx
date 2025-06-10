'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Upload } from 'lucide-react';
import { addCvToJob } from '@/services/job-service';
import { CVScreeningItem } from '@/types/cv-screening';
import { extractTextFromFile } from '@/utils/file-extractor';
import { toast } from 'sonner';
import CandidateCardList from '../../history/[slug]/[title]/candidate-card-list';
import { useJobStore } from '@/store/jobStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useCreditHistoryStore } from '@/store/creditHistoryStore';

export default function UploadCVs() {
  const router = useRouter();
  const [jobId, setJobId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '0';

  const { candidates, fetchAllCandidates, loading } = useJobStore();
  const { fecthDashboardAnalysis, fetchAllTransactions } =
    useTransactionStore();
  const { fetchAllCreditHistory } = useCreditHistoryStore();

  // Load job ID and fetch existing CVs
  useEffect(() => {
    const storedJobId = searchParams.get('id');
    if (!storedJobId) {
      router.push('/dashboard/cv-screening');
      return;
    }
    setJobId(storedJobId);

    // Fetch existing candidates when component mounts
    fetchAllCandidates(storedJobId);
  }, [router, searchParams, fetchAllCandidates]);

  // Debug: Log candidates to see what we're getting
  useEffect(() => {
    console.log('Candidates from store:', candidates);
    console.log('Loading state:', loading);
  }, [candidates, loading]);

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

      const response = await addCvToJob({
        job_id: Number(jobId),
        cv_description: extractedContent,
      });

      // Refresh the candidates list after successful upload
      await fetchAllCandidates(jobId);

      toast.success('CV uploaded and screened successfully!');
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast.error('Failed to upload and screen CV', {
        description: 'Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.txt';
    fileInput.multiple = false;

    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };

    fileInput.click();
  };

  const handleRefresh = async () => {
    try {
      await fetchAllCandidates(id);
      toast.success('Data refreshed successfully!');

      // update dashboard and other data
      await Promise.all([
        fecthDashboardAnalysis(),
        fetchAllTransactions(),
        fetchAllCreditHistory(),
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data');
    }
  };

  // Use candidates from store to determine if we have screened CVs
  const hasScreenedCvs =
    candidates.candiddates && candidates.candiddates.length > 0;

  // Debug: Show current state
  console.log('Has screened CVs:', hasScreenedCvs);
  console.log('Candidates length:', candidates?.length || 0);

  return (
    <div className='flex flex-1 flex-col space-y-6'>
      {/* Header with navigation and actions */}
      <div className='flex items-center justify-between'>
        <Button
          variant='ghost'
          onClick={() => router.push('/dashboard/cv-screening')}
          className='gap-2'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Job Description
        </Button>

        <div className='flex gap-2'>
          {/* Upload button - shown at top when we have screened CVs */}
          {hasScreenedCvs && (
            <Button
              onClick={triggerFileUpload}
              disabled={isUploading}
              className='gap-2'
            >
              <Upload className='h-4 w-4' />
              {isUploading ? 'Uploading...' : 'Upload Another CV'}
            </Button>
          )}

          <Button
            variant='outline'
            onClick={handleRefresh}
            disabled={loading}
            className='gap-2'
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main content area */}
      {loading && !hasScreenedCvs ? (
        // Loading state - show loading indicator
        <div className='flex flex-1 flex-col justify-center items-center'>
          <div className='text-center space-y-6'>
            <RefreshCw className='h-8 w-8 animate-spin mx-auto text-gray-400' />
            <div className='space-y-2'>
              <h3 className='text-lg font-medium text-gray-900'>
                Loading candidates...
              </h3>
              <p className='text-gray-500'>
                Please wait while we fetch your screened CVs
              </p>
            </div>
          </div>
        </div>
      ) : !hasScreenedCvs ? (
        // Empty state - show centered upload zone
        <div className='flex flex-1 flex-col justify-center items-center'>
          <div className='text-center space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-lg font-medium text-gray-900'>
                No CVs uploaded yet
              </h3>
              <p className='text-gray-500'>
                Upload your first CV to start the screening process
              </p>
            </div>

            <Button
              onClick={triggerFileUpload}
              disabled={isUploading}
              size='lg'
              className='gap-2'
            >
              <Upload className='h-5 w-5' />
              {isUploading ? 'Uploading CV...' : 'Upload CV for Screening'}
            </Button>
          </div>
        </div>
      ) : (
        // Content state - show CV list
        <div className='space-y-6'>
          <div className='text-sm text-gray-500 mb-4'>
            Showing {candidates.candiddates?.length || 0} screened candidate(s)
          </div>
          <CandidateCardList
            items={candidates.candiddates || []}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
