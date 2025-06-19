// 📁 app/papers/page.tsx
'use client';

import { useAuth } from '@/store/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import UpgradeCTA from '@/components/pricing/UpgradeCTA';

interface Paper {
  year: string;
  subject: string;
  questions: string[];
}

export default function PreviousYearPapersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return router.push('/login');
    if (user.tier === 'free' || user.tier === 'basic') return;

    api.get('/api/previous-papers')
      .then((res) => setPapers(res.data.papers))
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;
  if (user.tier !== 'premium') return <UpgradeCTA feature="Previous Year Papers" />;

  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-display mb-6 text-center">
        Previous Year Papers
      </h1>

      {loading ? (
        <p className="text-center text-slate-500">Loading...</p>
      ) : papers.length === 0 ? (
        <p className="text-center text-slate-600">No papers found.</p>
      ) : (
        <div className="space-y-6">
          {papers.map((paper, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold text-brand-700 mb-2">
                {paper.subject} ({paper.year})
              </h2>
              <ul className="list-disc text-slate-700 pl-6 space-y-1 text-sm">
                {paper.questions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
