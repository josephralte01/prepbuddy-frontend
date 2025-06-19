// 📁 app/mock-tests/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MockTest {
  _id: string;
  title: string;
  subject: string;
  totalQuestions: number;
}

export default function MockTestPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return router.push('/login');
    api.get('/api/mock-tests')
      .then((res) => setTests(res.data.tests))
      .catch(() => setError('Failed to load mock tests'))
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 font-display text-center">
        Available Mock Tests
      </h1>

      {loading && <p className="text-center text-slate-500">Loading tests...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && tests.length === 0 && (
        <p className="text-center text-slate-600">No mock tests available right now.</p>
      )}

      <div className="space-y-4">
        {tests.map((test) => (
          <div
            key={test._id}
            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-800">{test.title}</h2>
              <p className="text-slate-600 text-sm">Subject: {test.subject}</p>
              <p className="text-slate-500 text-xs">Questions: {test.totalQuestions}</p>
            </div>
            <Link href={`/mock-tests/${test._id}`}>
              <Button className="mt-3 sm:mt-0">Start Test</Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
