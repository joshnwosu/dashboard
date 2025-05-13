import TitleDescription from '@/components/title-description';
import { searchQueries } from '@/data/search';
import { formatDateToShortString } from '@/utils/formatter';
import { ArrowRight } from 'lucide-react';
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
            className='group border  hover:bg-sidebar rounded-2xl'
          >
            <Link
              href={`/dashboard/history/${slug}/${index}`}
              className='flex items-center justify-between gap-2 p-4'
            >
              <div className='flex flex-col gap-2'>
                <span>{search.query}</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDateToShortString(search.time)}
                </span>
              </div>

              <ArrowRight className='h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Optional: Pre-render specific slugs
export async function generateStaticParams() {
  return [{ slug: 'search-history' }, { slug: 'cv-screening-history' }];
}
