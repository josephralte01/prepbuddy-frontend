// === lib/hooks/useChallengePolling.ts ===
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const useChallengePolling = () => {
  return useQuery({
    queryKey: ['userChallenges'],
    queryFn: async () => {
      const res = await api.get('/api/challenges/status');
      return res.data.challenges;
    },
    refetchInterval: 10000, // 10s polling
  });
};
