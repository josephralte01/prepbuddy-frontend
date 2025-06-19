// 📁 app/search/page.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/store/auth';
import UpgradeCTA from '@/components/pricing/UpgradeCTA';

export default function SearchPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setData(null);
    setError('');
    try {
      const res = await api.get(`/api/search?q=${query}`);
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-display mb-6 text-center">
        Search Exam Syllabus & Materials
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <Input
          placeholder="e.g. NEET, JEE Advanced, UPSC Prelims"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Fetching...' : <><Sparkles className="mr-2 h-4 w-4" /> Search</>}
        </Button>
      </div>

      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

      {data && (
        <section className="space-y-6">
          {data.syllabus && (
            <div>
              <h2 className="text-xl font-semibold text-brand-600 mb-2">Syllabus</h2>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                {data.syllabus.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {data.studyMaterials && user?.tier !== 'free' && (
            <div>
              <h2 className="text-xl font-semibold text-brand-600 mb-2">Study Materials</h2>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                {data.studyMaterials.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {data.studyMaterials && user?.tier === 'free' && (
            <UpgradeCTA feature="Study Materials" />
          )}
        </section>
      )}
    </main>
  );
}
