'use client';

import { SearchItem, useJobStore } from '@/store/jobStore';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SearchListProps {
  slug: string;
}

export default function SearchList({ slug }: SearchListProps) {
  const {
    searchHistory,
    cvScreeningHistory,
    fetchSearchHistory,
    fetchCvScreeningHistory,
    loading,
    error,
    clearError,
  } = useJobStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Matches API default; adjust if needed

  // Select the appropriate history based on slug
  const history =
    slug === 'search-history' ? searchHistory : cvScreeningHistory;

  useEffect(() => {
    if (slug === 'search-history') {
      fetchSearchHistory();
      //   console.log('search-history: ', searchHistory);
    } else {
      fetchCvScreeningHistory();
      //   console.log('cv-history: ', cvScreeningHistory);
    }
  }, [slug, currentPage, perPage, fetchSearchHistory, fetchCvScreeningHistory]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError(); // Clear error after displaying
    }
  }, [error, clearError]);

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (history && currentPage < history.lastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Calculate pagination info
  const totalItems = history?.total || 0;
  const lastPage = history?.lastPage || 1;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div>
      {loading && (
        <div className='flex items-center justify-center'>
          <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          <span className='ml-2 text-muted-foreground'>
            Loading search history...
          </span>
        </div>
      )}
      {!loading && error && (
        <div className='text-center text-red-500'>
          Failed to load search history. Please try again.
        </div>
      )}
      {!loading && !error && history && history?.jobs?.length > 0 && (
        <>
          <ul className='space-y-2'>
            {history.jobs.map((search: SearchItem) => (
              <li
                key={search.id} // Use unique ID instead of index
                className='group border rounded-sm hover:bg-muted'
              >
                <Link
                  // href={`/dashboard/history/${slug}/${encodeURIComponent(
                  //   search.title
                  // )}`}
                  href={{
                    pathname: `/dashboard/history/${slug}/${encodeURIComponent(
                      search.title
                    )}`,
                    query: { id: search.id },
                  }}
                  className='flex items-center justify-between gap-2 p-4'
                  aria-label={`View details for ${search.title}`}
                >
                  <div className='flex flex-col gap-2'>
                    <span className='font-medium text-sm'>{search.title}</span>
                  </div>
                  <ArrowRight className='h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className='mt-6 flex items-center justify-between'>
            <div className='text-sm text-muted-foreground'>
              Showing {startItem}-{endItem} of {totalItems} items
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium',
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label='Previous page'
              >
                <ChevronLeft className='h-4 w-4' />
                Previous
              </button>
              <span className='text-sm text-muted-foreground'>
                Page {currentPage} of {lastPage}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage >= lastPage}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium',
                  currentPage >= lastPage
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label='Next page'
              >
                Next
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        </>
      )}
      {!loading && !error && history && history?.jobs?.length === 0 && (
        <div className='text-center text-muted-foreground'>
          No search history available.
        </div>
      )}
    </div>
  );
}
