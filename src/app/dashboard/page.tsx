// 📁 app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

export default function DashboardPage() {
  const { isLoggedIn, fetchUser, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
    </main>
  );
}
v