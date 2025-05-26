'use client';

interface LoadingScreenProps {
  title: string;
}

const LoadingScreen = ({ title = 'Loading...' }: LoadingScreenProps) => {
  return (
    <div className='fixed inset-0 bg-white dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-12 h-12 border-2 border-t-2 border-t-green-500 border-gray-200 rounded-full animate-spin'></div>
        <p className='text-muted-foreground text-md font-semibold italic'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
