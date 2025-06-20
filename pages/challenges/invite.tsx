// === pages/challenges/invite.tsx ===
import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WebChallengeInvitePage() {
  const [username, setUsername] = useState('');
  const [goalXP, setGoalXP] = useState(100);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleInvite = async () => {
    try {
      await api.post('/api/challenges', {
        invitees: [username],
        goalXP,
      });
      setStatus('✅ Challenge sent successfully!');
      setTimeout(() => router.push('/challenges'), 1200);
    } catch (err) {
      setStatus('❌ Failed to send challenge.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">🔥 Send a Duel Challenge</h1>

      <Input
        placeholder="Opponent username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4"
      />

      <Input
        type="number"
        placeholder="XP Goal (e.g. 100)"
        value={goalXP}
        onChange={(e) => setGoalXP(parseInt(e.target.value))}
        className="mb-4"
      />

      <Button onClick={handleInvite}>🚀 Challenge Now</Button>

      {status && (
        <p className="mt-4 text-sm text-muted-foreground">
          {status}
        </p>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>🎯 Track your progress in the leaderboard.</p>
        <p>💥 XP earned during the challenge window counts toward the goal.</p>
        <p>⏳ All participants must accept to begin the duel.</p>
      </div>
    </div>
  );
}
