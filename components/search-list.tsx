'use client';

import { SearchItem, useJobStore } from '@/store/jobStore';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  FileText,
  Calendar,
  Clock,
  Filter,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
  const [perPage] = useState(6);

  // Select the appropriate history based on slug
  const history =
    slug === 'search-history' ? searchHistory : cvScreeningHistory;
  const isSearchHistory = slug === 'search-history';

  useEffect(() => {
    if (slug === 'search-history') {
      fetchSearchHistory(currentPage, perPage);
    } else {
      fetchCvScreeningHistory(currentPage, perPage);
    }
  }, [slug, currentPage, perPage, fetchSearchHistory, fetchCvScreeningHistory]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // clearError();
    }
  }, [error, clearError]);

  // Calculate pagination info
  const totalItems = history?.total || 0;
  const lastPage = history?.lastPage || 1;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return 'Today';
      if (diffDays === 2) return 'Yesterday';
      if (diffDays <= 7) return `${diffDays - 1} days ago`;

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    } catch {
      return 'Recent';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  };

  // Generate pagination pages array
  const generatePaginationPages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(lastPage);
      } else if (currentPage >= lastPage - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = lastPage - 3; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(lastPage);
      }
    }

    return pages;
  };

  return (
    <div className='max-w-3xl relative'>
      {/* Header Section */}
      <div className='mb-12'>
        <div className='flex items-center justify-between mb-6'>
          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <div className='p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700'>
                {isSearchHistory ? (
                  <Search className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                ) : (
                  <FileText className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                )}
              </div>
              <div>
                <h1 className='text-lg font-normal text-gray-900 dark:text-white'>
                  {isSearchHistory ? 'Search History' : 'CV Screening History'}
                </h1>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Track and manage your{' '}
                  {isSearchHistory ? 'job searches' : 'candidate screenings'}
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm'>
              <Filter className='h-4 w-4' />
              Filter
            </button>
            {totalItems > 0 && (
              <div className='px-4 py-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-800'>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className='flex flex-col items-center justify-center py-24'>
          <div className='relative mb-6'>
            <div className='w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700'></div>
            <div className='absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-blue-500 animate-spin'></div>
          </div>
          <div className='text-center space-y-2'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Loading History
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Please wait while we fetch your data...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className='text-center py-24'>
          <div className='max-w-md mx-auto'>
            <div className='w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-6'>
              <svg
                className='w-8 h-8 text-red-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Something went wrong
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              We couldn't load your history. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm'
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && history && (
        <>
          {history?.jobs?.length > 0 ? (
            <div className='space-y-8'>
              {/* Items Grid */}
              <div className='grid gap-2'>
                {history.jobs.map((search: SearchItem, index: number) => (
                  <div
                    key={search.id}
                    className='group relative'
                    style={{
                      animation: `slideInUp 0.4s ease-out ${
                        index * 0.08
                      }s both`,
                    }}
                  >
                    <Link
                      href={{
                        pathname: `/dashboard/history/${slug}/${encodeURIComponent(
                          search.title
                        )}`,
                        query: { id: search.id },
                      }}
                      className='block'
                      aria-label={`View details for ${search.title}`}
                      onClick={() => console.log('S: ', search)}
                    >
                      <div className='relative overflow-hidden bg-transparent border rounded-2xl p-4 hover:shadow-xl hover:shadow-gray-900/5 dark:hover:shadow-black/20 transition-all duration-300 hover:bg-white dark:hover:bg-sidebar '>
                        <div className='flex items-start justify-between gap-6'>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start gap-4'>
                              <div className='p-3 rounded-xl bg-muted dark:bg-muted group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300'>
                                {isSearchHistory ? (
                                  <Search className='h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300' />
                                ) : (
                                  <FileText className='h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300' />
                                )}
                              </div>

                              <div className='flex-1 space-y-3'>
                                <div>
                                  <h3 className='text-sm font-normal text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight'>
                                    {search.title}
                                  </h3>
                                  <p className='text-sm text-gray-600 dark:text-gray-400 hidden'>
                                    {isSearchHistory
                                      ? 'Job search query'
                                      : 'CV screening session'}
                                  </p>
                                </div>

                                <div className='flex items-center gap-6 text-xs'>
                                  {search.createdAt && (
                                    <>
                                      <div className='flex items-center gap-1.5 text-gray-500 dark:text-gray-400'>
                                        <Calendar className='h-3.5 w-3.5' />
                                        <span className='font-medium'>
                                          {formatDate(search.createdAt)}
                                        </span>
                                      </div>
                                      <div className='flex items-center gap-1.5 text-gray-500 dark:text-gray-400'>
                                        <Clock className='h-3.5 w-3.5' />
                                        <span>
                                          {formatTime(search.createdAt)}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className='flex justify-between items-center'>
                {/* Results Info */}
                {lastPage > 1 && (
                  <div className='flex items-center justify-between text-sm text-muted-foreground'>
                    <div className='flex items-center gap-2'>
                      <span>Showing</span>
                      <span className='px-2 py-1 bg-muted text-foreground font-medium rounded'>
                        {startItem}-{endItem}
                      </span>
                      <span>of</span>
                      <span className='px-2 py-1 bg-muted text-foreground font-medium rounded'>
                        {totalItems}
                      </span>
                      <span>results</span>
                    </div>
                  </div>
                )}

                {/* shadcn Pagination */}
                {lastPage > 1 && (
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              currentPage > 1 && setCurrentPage(currentPage - 1)
                            }
                            className={cn(
                              currentPage === 1 &&
                                'pointer-events-none opacity-50'
                            )}
                          />
                        </PaginationItem>

                        {generatePaginationPages().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === 'ellipsis' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                onClick={() => setCurrentPage(page as number)}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              currentPage < lastPage &&
                              setCurrentPage(currentPage + 1)
                            }
                            className={cn(
                              currentPage >= lastPage &&
                                'pointer-events-none opacity-50'
                            )}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Professional Empty State */
            <div className='text-center py-24'>
              <div className='max-w-md mx-auto'>
                <div className='w-24 h-24 mx-auto mb-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
                  <div className='w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm'>
                    {isSearchHistory ? (
                      <Search className='h-6 w-6 text-gray-400 dark:text-gray-500' />
                    ) : (
                      <FileText className='h-6 w-6 text-gray-400 dark:text-gray-500' />
                    )}
                  </div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    No {isSearchHistory ? 'searches' : 'screenings'} yet
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                    {isSearchHistory
                      ? 'Start searching for jobs and your history will appear here. All your searches are automatically saved for easy reference.'
                      : 'Begin screening candidates and your history will be tracked here. Access your previous screening sessions anytime.'}
                  </p>
                  <div className='pt-4'>
                    <Link
                      href={
                        isSearchHistory
                          ? '/dashboard/search'
                          : '/dashboard/cv-screening'
                      }
                      className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md'
                    >
                      Get Started
                      <ArrowRight className='h-4 w-4' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
