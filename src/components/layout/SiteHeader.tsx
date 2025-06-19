// 📁 src/components/layout/SiteHeader.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function SiteHeader() {
  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="PrepBuddy Logo" width={40} height={40} />
        <span className="text-xl font-bold text-indigo-700 tracking-tight">PrepBuddy</span>
      </Link>

      <nav className="flex items-center space-x-4">
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-black">
          Login
        </Link>
        <Link href="/register">
          <Button>Sign Up</Button>
        </Link>
      </nav>
    </header>
  );
}
