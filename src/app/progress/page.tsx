// 📁 app/progress/page.tsx
'use client';

import { useAuth } from '@/store/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface ProgressItem {
  testTitle: string;
  score: number;
  total: number;
  date: string;
}

export default function UserProgressPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return router.push('/login');
    api.get('/api/user-progress')
      .then((res) => setProgress(res.data.progress))
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 font-display text-center">Your Progress</h1>

      {loading ? (
        <p className="text-center text-slate-500">Loading...</p>
      ) : progress.length === 0 ? (
        <p className="text-center text-slate-600">No progress data yet.</p>
      ) : (
        <div className="space-y-4">
          {progress.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold text-brand-700">{item.testTitle}</h2>
              <p className="text-slate-600 text-sm">
                Score: {item.score} / {item.total} —{' '}
                {((item.score / item.total) * 100).toFixed(0)}%
              </p>
              <p className="text-slate-400 text-xs">Taken on {new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
