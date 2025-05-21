'use client';

interface LoadingScreenProps {
  title: string;
}

const LoadingScreen = ({ title = 'loading...' }: LoadingScreenProps) => {
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-8 h-8 border-2 border-t-4 border-t-green-500 border-gray-200 rounded-full animate-spin'></div>
        <p className='text-muted-foreground text-sm font-semibold'>{title}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
