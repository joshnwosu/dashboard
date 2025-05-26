'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading-screen';
import { useUserStore } from '@/store/userStore';
import { SettingsDialog } from '@/components/settings-dialog';
import { useSettingsStore } from '@/store/settingsStore';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { getUserProfile, user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const { isOpen, setIsOpen } = useSettingsStore();

  const initialize = async () => {
    setLoading(true);
    try {
      await Promise.all([!user && getUserProfile()]);
    } catch (error: any) {
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, [router]);

  if (loading || !user) {
    return (
      <LoadingScreen title="Welcome back! We're setting everything up for you ..." />
    );
  }

  return (
    <SidebarProvider className='font-sans'>
      <AppSidebar variant='sidebar' collapsible='icon' />
      <SidebarInset>
        <Header />
        <div className='w-full py-6 max-w-7xl mx-auto flex flex-1 flex-col gap-4 p-8'>
          {children}
        </div>

        <SettingsDialog open={isOpen} onOpenChange={setIsOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
