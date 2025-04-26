import { notFound } from 'next/navigation';

interface HistoryPageProps {
  params: {
    id: string;
  };
}

export default function History({ params }: HistoryPageProps) {
  const { id } = params;

  // Example: Validate or fetch data based on id
  if (!id || isNaN(Number(id))) {
    notFound(); // Redirect to 404 if id is invalid
  }

  return (
    <div className=''>
      <h1 className='text-2xl font-bold'>History Details for ID: {id}</h1>
      <p>This is the history page for item {id}.</p>
      {/* Add your content here, e.g., fetch data based on id */}
    </div>
  );
}
