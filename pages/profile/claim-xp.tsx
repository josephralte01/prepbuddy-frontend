import { useEffect, useState } from 'react';
import { useUser } from '@/lib/useUser';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function ClaimXPPage() {
  const { user, refetch } = useUser();
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await api.get('/xp/rewards');
        setRewards(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRewards();
  }, []);

  const handleClaim = async (rewardId: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/xp/claim/${rewardId}`);
      toast.success('🎉 XP Claimed!');
      setRewards(rewards.filter((r) => r._id !== rewardId));
      refetch();
    } catch (err) {
      toast.error('Failed to claim XP.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🎖️ Claim XP Rewards</h1>

      {rewards.length === 0 ? (
        <p className="text-center text-muted-foreground">No unclaimed XP rewards available.</p>
      ) : (
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward._id}
              className="bg-white dark:bg-gray-900 shadow rounded-lg p-5 border border-gray-100 dark:border-gray-800"
            >
              <h3 className="font-semibold text-lg">{reward.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
              <Button
                onClick={() => handleClaim(reward._id)}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  `Claim ${reward.xp} XP`
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
