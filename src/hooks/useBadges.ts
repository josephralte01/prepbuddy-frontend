import useSWR from "swr";
import axios from "axios";

export function useBadges() {
  const { data, mutate, isLoading, error } = useSWR("/api/badges", async () => {
    const res = await axios.get("/api/badges");
    return res.data;
  });

  const claimBadge = async (badgeId: string) => {
    await axios.post("/api/badges/claim", { badgeId });
    mutate();
  };

  return {
    badges: data || [],
    isLoading,
    error,
    claimBadge,
  };
}
