import { CardDash } from '@/components/card-dash';

export default function Home() {
  return (
    <>
      {/* <div className='grid auto-rows-min gap-4 md:grid-cols-4'>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
      <CardDash />
      <div className='w-full h-[100vh] rounded-xl bg-muted/50' /> */}

      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <CardDash />
          </div>

          {/* <div className='w-full h-[100vh] rounded-xl bg-muted/50' /> */}
        </div>
      </div>
    </>
  );
}
