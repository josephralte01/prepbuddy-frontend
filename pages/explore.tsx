import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/lib/hooks/useUser';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ExplorePage() {
  const { user } = useUser();
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [structure, setStructure] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState('');

  useEffect(() => {
    axios.get('/api/exams').then((res) => setExams(res.data));
  }, []);

  const loadStructure = async (examId: string) => {
    setSelectedExamId(examId);
    const res = await axios.get(`/api/exams/${examId}/structure`);
    setStructure(res.data);
  };

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Explore Exams</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {exams.map((exam) => (
            <Button
              key={exam._id}
              variant={exam._id === selectedExamId ? 'default' : 'outline'}
              onClick={() => loadStructure(exam._id)}
            >
              {exam.name}
            </Button>
          ))}
        </div>

        {structure && (
          <div className="space-y-6">
            {structure.subjects.map((subject) => (
              <div key={subject._id}>
                <h2 className="text-xl font-semibold mb-2">
                  {subject.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {subject.chapters.map((chapter) => (
                    <Card
                      key={chapter._id}
                      className="cursor-pointer hover:shadow-md transition"
                      onClick={() => router.push(`/material/${chapter._id}`)}
                    >
                      <CardContent className="p-4">
                        <p className="font-medium">{chapter.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
