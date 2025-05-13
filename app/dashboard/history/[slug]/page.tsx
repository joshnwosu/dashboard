import TitleDescription from '@/components/title-description';
import { Skeleton } from '@/components/ui/skeleton';
import { searchQueries } from '@/data/search';
import { formatDateToShortString } from '@/utils/formatter';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function HistoryPage({ params }: PageProps) {
  const { slug } = await params; // Await params

  // Define valid slugs
  const validSlugs = ['search-history', 'cv-screening-history'];

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const title =
    slug === 'search-history' ? 'Search History' : 'CV Screening History';

  const buttonText =
    slug === 'search-history' ? 'Clear History' : 'Export History';

  return (
    <div>
      <TitleDescription title={title} showButton buttonText={buttonText} />

      <ul className='space-y-2'>
        {searchQueries.map((search, index) => (
          <li
            key={index.toString()}
            className='border  hover:bg-sidebar rounded-2xl'
          >
            <Link
              href={`/dashboard/history/${slug}/${index}`}
              className='flex flex-col gap-2 p-4'
            >
              <span>{search.query}</span>
              <span className='text-sm text-muted-foreground'>
                {formatDateToShortString(search.time)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
}

// Optional: Pre-render specific slugs
export async function generateStaticParams() {
  return [{ slug: 'search-history' }, { slug: 'cv-screening-history' }];
}
