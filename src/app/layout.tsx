// 📁 app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrepBuddy – Crack Exams with Confidence',
  description: 'Your ultimate guide to competitive exam preparation in India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900`}>        
        <SiteHeader />
        <main className="min-h-[80vh] px-4 py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
