import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { geistMono, geistSans } from './fonts';

export const metadata: Metadata = {
  title: 'Sourzer',
  description: 'The Ultimate Search Engine for Recruiters',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors theme='system' toastOptions={{}} />
        </ThemeProvider>
      </body>
    </html>
  );
}
