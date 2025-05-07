import { notFound } from 'next/navigation';

interface SearchResultProps {
  params: Promise<{ id: string }>; // Use Promise for params
}

export default async function SearchResult({ params }: SearchResultProps) {
  const { id } = await params; // Await params to resolve the Promise

  // Mock data (replace with your logic later)
  const data = { id };

  // Handle invalid or missing data
  if (!data) {
    notFound(); // Renders 404 page
  }

  return (
    <div>
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
