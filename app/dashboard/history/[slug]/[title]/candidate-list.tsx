'use client';

import { useJobStore } from '@/store/jobStore';
import { useEffect, useRef, useState } from 'react';
import CandidateCardList from './candidate-card-list';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CandidateList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') || '0';

  const { candidates, fetchAllCandidates, loading } = useJobStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  useEffect(() => {
    // Check if id is valid (not '0' or empty)
    if (!id || id === '0') {
      router.push('/dashboard/search');
      return;
    }

    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Initial fetch immediately
    fetchAllCandidates(id);

    // Set up continuous polling every 5 seconds
    intervalRef.current = setInterval(() => {
      fetchAllCandidates(id);
    }, 2000); // 2 seconds for faster updates

    // Cleanup interval when component unmounts or id changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setHasInitiallyLoaded(false); // Reset on cleanup
    };
  }, [id, fetchAllCandidates, router]);

  // Track when initial data has loaded for animation purposes
  useEffect(() => {
    if (
      candidates?.candiddates &&
      candidates.candiddates.length > 0 &&
      !hasInitiallyLoaded
    ) {
      setHasInitiallyLoaded(true);
    }
  }, [candidates, hasInitiallyLoaded]);

  return (
    <CandidateCardList
      items={candidates?.candiddates || []}
      loading={loading && !hasInitiallyLoaded}
      key={hasInitiallyLoaded ? 'loaded' : 'loading'}
      sourceCompleted={candidates.source_completed}
    />
  );
}
