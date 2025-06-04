

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='relative min-h-screen font-sans'>
      <div className='relative z-10 flex items-center justify-center min-h-screen py-12'>
        {children}
      </div>

    </main>
  );
}
