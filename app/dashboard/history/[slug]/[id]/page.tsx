import { notFound } from 'next/navigation';
import CardGrid, { ItemProps } from '@/components/card-grid';

interface PageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

async function fetchItems(slug: string, id: string): Promise<ItemProps[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const validSlugs = ['search-history', 'cv-screening-history'];
  if (!validSlugs.includes(slug)) {
    throw new Error('Invalid slug');
  }

  //   // Example: Validate ID and return items
  //   const validIds = ['123', '456']; // Replace with real data source
  //   if (!validIds.includes(id)) {
  //     throw new Error('Invalid ID');
  //   }

  // Return items based on slug and id
  if (slug === 'search-history') {
    return [
      {
        avatar: 'https://i.pravatar.cc/150?img=1',
        name: 'John Robin',
        about:
          'John is a seasoned Software Engineer with over 8 years of experience building scalable web applications and microservices architectures...',
        jobTitle: 'Software Engineer',
        company: 'Tech Corp',
        status: 'Active',
        value: '93%',
        type: 'increase',
      },
      {
        avatar: 'https://i.pravatar.cc/150?img=2',
        name: 'Jane Smith',
        about:
          'Jane is an accomplished Product Manager with a knack for transforming complex ideas into user-centric products...',
        jobTitle: 'Product Manager',
        company: 'Business Inc',
        status: 'Inactive',
        value: '25%',
        type: 'decrease',
      },
    ];
  } else if (slug === 'cv-screening-history') {
    return [
      {
        avatar: 'https://i.pravatar.cc/150?img=5',
        name: 'Emma Wilson',
        about:
          'Emma is a skilled Data Scientist with a passion for uncovering insights from complex datasets...',
        jobTitle: 'Data Scientist',
        company: 'Insight Analytics',
        status: 'Active',
        value: '80%',
        type: 'increase',
      },
      {
        avatar: 'https://i.pravatar.cc/150?img=6',
        name: 'Michael Chen',
        about:
          'Michael is an experienced DevOps Engineer with a focus on automating infrastructure and improving CI/CD pipelines...',
        jobTitle: 'DevOps Engineer',
        company: 'CloudWorks',
        status: 'Pending',
        value: '15%',
        type: 'decrease',
      },
    ];
  }

  return [];
}

export default async function HistoryItemPage({ params }: PageProps) {
  const { slug, id } = await params;

  try {
    const items = await fetchItems(slug, id);
    return (
      <div>
        {/* <p>{id}</p> */}
        <CardGrid items={items} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

// export async function generateStaticParams() {
//   const validSlugs = ['search-history', 'cv-screening-history'];
//   const validIds = ['123', '456']; // Replace with real data source

//   return validSlugs.flatMap((slug) =>
//     validIds.map((id) => ({
//       slug,
//       id,
//     }))
//   );
// }
