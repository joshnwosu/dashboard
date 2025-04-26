import { notFound } from 'next/navigation';

interface HistoryPageProps {
  params: Promise<{ id: string }>; // Use Promise for params
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { id } = await params; // Await params to resolve the Promise

  // Mock data (replace with your logic later)
  const historyItem = { id, title: `History Item ${id}` };

  // Handle invalid or missing data
  if (!historyItem) {
    notFound(); // Renders 404 page
  }

  return (
    <div>
      <h1>{historyItem.title}</h1>
      <p>ID: {id}</p>
    </div>
  );
}

// Optional: For SSG, predefine valid IDs
export async function generateStaticParams() {
  // Mock IDs (replace with your logic when available)
  const ids = ['1', '2', '3'];
  return ids.map((id) => ({ id }));
}

// Optional: ISR for dynamic content
export const revalidate = 60; // Revalidate every 60 seconds
