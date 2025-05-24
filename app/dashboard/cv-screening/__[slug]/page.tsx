// import TitleDescription from '@/components/title-description';
// import { Skeleton } from '@/components/ui/skeleton';

// interface PageProps {
//   params: Promise<{ slug: string }>; // Note: params is a Promise
// }

// export default async function Page({ params }: PageProps) {
//   const { slug } = await params; // Get slug from useParams

//   return (
//     <div>
//       <TitleDescription
//         title={slug}
//         showButton
//         buttonText='Upload CV'
//       />
//       <div className='mt-8'>
//         <SkeletonDemo />
//       </div>
//     </div>
//   );
// }

// function SkeletonDemo() {
//   return (
//     <div className='flex items-center space-x-4'>
//       <Skeleton className='h-12 w-12 rounded-full' />
//       <div className='space-y-2'>
//         <Skeleton className='h-4 w-[250px]' />
//         <Skeleton className='h-4 w-[200px]' />
//       </div>
//     </div>
//   );
// }

'use client';

import { useParams } from 'next/navigation';
import TitleDescription from '@/components/title-description';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
  const params = useParams();
  const slug = params.slug as string; // Type assertion for TypeScript

  return (
    <div>
      <TitleDescription
        title={slug}
        showButton
        buttonText='Upload CV'
        onButtonClick={() => console.log('Hello Button...')}
      />
      <div className='mt-8'>
        <SkeletonDemo />
      </div>
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
