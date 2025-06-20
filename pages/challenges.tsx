// === frontend/pages/challenges.tsx ===
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useUser } from '@/lib/useUser';
import { useChallengeSocket } from '@/lib/hooks/useChallengeSocket';

export default function ChallengePage() {
  const { user } = useUser();
  useChallengeSocket();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const res = await api.get('/api/challenges/user');
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) return <p>Loading challenges...</p>;
  if (isError) return <p>Failed to load challenges</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-4">Challenges</h1>
      {data?.length > 0 ? (
        <ul className="space-y-4">
          {data.map((challenge: any) => (
            <li
              key={challenge._id}
              className="border rounded-lg p-4 shadow-sm flex flex-col gap-1"
            >
              <div className="font-semibold">{challenge.title}</div>
              <div className="text-sm text-muted-foreground">Status: {challenge.status}</div>
              <div className="text-sm text-gray-500">
                Participants: {challenge.participants.length}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No challenges yet.</p>
      )}
    </div>
  );
}
