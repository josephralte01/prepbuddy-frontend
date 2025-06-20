import useSWR from "swr";
import axios from "axios";

export function useLeaderboard(timeframe: "week" | "month" | "all" = "all") {
  const { data, isLoading, mutate, error } = useSWR(`/api/leaderboard?timeframe=${timeframe}`, async () => {
    const res = await axios.get(`/api/leaderboard?timeframe=${timeframe}`);
    return res.data;
  });

  return {
    leaderboard: data || [],
    isLoading,
    error,
    mutate
  };
}
