// 📁 app/mock-tests/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string; // Hidden during test
}

export default function MockTestRunner() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [qid: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return router.push('/login');
    api.get(`/api/mock-tests/${id}`)
      .then((res) => setQuestions(res.data.questions))
      .finally(() => setLoading(false));
  }, [id, user, router]);

  const handleSelect = (qid: string, ans: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: ans }));
  };

  const handleSubmit = async () => {
    await api.post(`/api/mock-tests/${id}/submit`, { answers });
    router.push('/progress');
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!questions.length) return <p className="p-6 text-center">No questions found.</p>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Mock Test</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
        {questions.map((q, i) => (
          <div key={q._id} className="border rounded-lg p-4">
            <p className="font-semibold mb-3">
              Q{i + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={q._id}
                    value={opt}
                    checked={answers[q._id] === opt}
                    onChange={() => handleSelect(q._id, opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <Button type="submit">Submit Test</Button>
        </div>
      </form>
    </main>
  );
}
