import useSWR from "swr";
import axios from "axios";

export function useHabitRewards() {
  const { data, mutate, isLoading, error } = useSWR("/api/habits", async () => {
    const res = await axios.get("/api/habits");
    return res.data;
  });

  return {
    habits: data?.dailyGoals || [],
    date: data?.date,
    xp: data?.xp,
    streak: data?.streak,
    rewardClaims: data?.rewardClaims || [],
    isLoading,
    error,
    mutate
  };
}
