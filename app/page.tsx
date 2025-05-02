export default function Home() {
  return (
    <>
      <div className='grid auto-rows-min gap-4 md:grid-cols-4'>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
      <div className='w-full h-[100vh] rounded-xl bg-muted/50' />
    </>
  );
}
