import CardGrid, { ItemProps } from '@/components/card-grid';
import { shuffleArray } from '@/utils/shuffleArray';
import { notFound } from 'next/navigation';

interface HistoryPageProps {
  params: Promise<{ id: string }>;
}

const items: ItemProps[] = [
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
  {
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'Alice Johnson',
    about:
      'Alice is a creative UI/UX Designer with a passion for crafting intuitive and visually stunning user experiences...',
    jobTitle: 'UI/UX Designer',
    company: 'Creative Studio',
    status: 'Pending',
    value: '55%',
    type: 'medium',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=4',
    name: 'Bob Brown',
    about:
      'Bob is a dynamic Marketing Manager with a proven track record of driving brand growth and customer engagement...',
    jobTitle: 'Marketing Manager',
    company: 'Data Solutions',
    status: 'Active',
    value: '30%',
    type: 'decrease',
  },
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
  {
    avatar: 'https://i.pravatar.cc/150?img=7',
    name: 'Sarah Davis',
    about:
      'Sarah is a talented Content Strategist with a knack for creating compelling narratives...',
    jobTitle: 'Content Strategist',
    company: 'BrandBuzz',
    status: 'Inactive',
    value: '50%',
    type: 'medium',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=8',
    name: 'David Lee',
    about:
      'David is a strategic Business Analyst with expertise in process optimization and requirements gathering...',
    jobTitle: 'Business Analyst',
    company: 'Growth Partners',
    status: 'Active',
    value: '60%',
    type: 'medium',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=9',
    name: 'Laura Martinez',
    about:
      'Laura is an innovative Mobile Developer with a focus on creating high-performance iOS and Android applications...',
    jobTitle: 'Mobile Developer',
    company: 'AppCrafters',
    status: 'Pending',
    value: '75%',
    type: 'increase',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=10',
    name: 'Thomas Patel',
    about:
      'Thomas is a dedicated Cybersecurity Analyst with a focus on protecting organizations from digital threats...',
    jobTitle: 'Cybersecurity Analyst',
    company: 'SecureNet',
    status: 'Active',
    value: '10%',
    type: 'decrease',
  },
];

// Sort items by percentage in descending order
const sortedItems = items.sort((a, b) => {
  const valA = parseFloat(a.value?.replace('%', '') || '0');
  const valB = parseFloat(b.value?.replace('%', '') || '0');
  return valB - valA;
});

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { id } = await params;

  const historyItem = { id };

  if (!historyItem) {
    notFound();
  }

  return <CardGrid items={sortedItems} />;
}

export async function generateStaticParams() {
  const ids = ['1', '2', '3'];
  return ids.map((id) => ({ id }));
}

export const revalidate = 60;
