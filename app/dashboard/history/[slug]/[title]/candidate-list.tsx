// 'use client';

// import { useJobStore } from '@/store/jobStore';
// import { useEffect, useRef, useState } from 'react';
// import CandidateCardList from './candidate-card-list';
// import { useSearchParams } from 'next/navigation';

// export default function CandidateList() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id') || '0';

//   const { candidates, fetchAllCandidates, loading } = useJobStore();
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

//   // Helper function to check if polling should stop
//   const shouldStopPolling = () => {
//     if (!candidates?.candiddates || candidates.candiddates.length === 0) {
//       return false;
//     }

//     const lastCandidate =
//       candidates.candiddates[candidates.candiddates.length - 1];
//     return (
//       lastCandidate?.talent_score !== null &&
//       lastCandidate?.talent_score !== undefined
//     );
//   };

//   useEffect(() => {
//     // Initial fetch
//     fetchAllCandidates(id);

//     // Set up interval to fetch every 10 seconds (note: your code had 100000ms = 100s)
//     intervalRef.current = setInterval(() => {
//       // Check if we should stop polling before making the request
//       if (shouldStopPolling()) {
//         console.log('Stopping polling: last candidate has talent_score');
//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//         }
//         return;
//       }

//       fetchAllCandidates(id);
//     }, 5000); // Changed to 10 seconds (10000ms)

//     // Cleanup interval on unmount or when id changes
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//       setHasInitiallyLoaded(false); // Reset on cleanup
//     };
//   }, [id, fetchAllCandidates]);

//   useEffect(() => {
//     if (candidates?.candiddates && !hasInitiallyLoaded) {
//       setHasInitiallyLoaded(true);
//     }

//     // Check if polling should stop after candidates update
//     if (shouldStopPolling() && intervalRef.current) {
//       console.log(
//         'Stopping polling: last candidate has talent_score after update'
//       );
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }

//     console.log('cl: ', candidates);
//   }, [candidates, hasInitiallyLoaded]);

//   return (
//     <div>
//       <CandidateCardList
//         items={candidates.candiddates}
//         loading={loading && !hasInitiallyLoaded}
//         key={hasInitiallyLoaded ? 'loaded' : 'loading'}
//       />
//     </div>
//   );
// }

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
    }, 5000);

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
    <div>
      <CandidateCardList
        items={candidates?.candiddates || []}
        loading={loading && !hasInitiallyLoaded}
        key={hasInitiallyLoaded ? 'loaded' : 'loading'}
      />
    </div>
  );
}
