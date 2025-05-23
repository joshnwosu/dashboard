import SearchList from '@/components/search-list';
import TitleDescription from '@/components/title-description';
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
    <div className=''>
      {/* <TitleDescription title={title} showButton buttonText={buttonText} /> */}

      <SearchList slug={slug} />
    </div>
  );
}

// Optional: Pre-render specific slugs
export async function generateStaticParams() {
  return [{ slug: 'search-history' }, { slug: 'cv-screening-history' }];
}
