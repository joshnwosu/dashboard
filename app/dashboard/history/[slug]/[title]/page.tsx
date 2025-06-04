import TitleDescription from '@/components/title-description';
import CandidateList from './candidate-list';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; title: string }>;
}) {
  const { slug, title } = await params;

  const decodedTitle = decodeURIComponent(title);

  return (
    <div className='container'>
      <TitleDescription title={decodedTitle} />

      <CandidateList />
    </div>
  );
}
