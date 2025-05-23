import type { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className='font-sans'>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className='w-full py-6 max-w-7xl mx-auto flex flex-1 flex-col gap-4 p-8'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
