import useSWR from "swr";
import axios from "axios";

export function useHabits() {
  const { data, mutate, error, isLoading } = useSWR("/api/habits", async () => {
    const res = await axios.get("/api/habits");
    return res.data;
  });

  const completeHabit = async (type: "material" | "mock_test") => {
    await axios.post("/api/habits/complete", { type });
    mutate();
  };

  return {
    habits: data?.dailyGoals || [],
    date: data?.date,
    xp: data?.xp,
    streak: data?.streak,
    isLoading,
    error,
    completeHabit
  };
}
