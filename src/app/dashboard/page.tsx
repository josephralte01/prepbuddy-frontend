// 📁 app/dashboard/page.tsx
'use client';

import { useAuth } from '@/store/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen py-12 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-display mb-2">
        Welcome back, {user.name.split(' ')[0]} 👋
      </h1>
      <p className="text-slate-600 mb-6">You're currently on the <strong className="capitalize">{user.tier}</strong> plan.</p>

      <div className="space-x-4">
        <Link href="/search">
          <Button>Find Exams</Button>
        </Link>
        <Link href="/mock-tests">
          <Button variant="outline">Take Mock Test</Button>
        </Link>
        <Link href="/progress">
          <Button variant="outline">View Progress</Button>
        </Link>
        {user.tier !== 'premium' && (
          <Link href="/pricing">
            <Button variant="ghost">Upgrade to Premium</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
