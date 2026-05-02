import type {Metadata} from 'next';
import './globals.css'; // Global styles
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'Oregon Battle of the Books',
  description: 'OBOB Management',
  manifest: '/manifest.json',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
