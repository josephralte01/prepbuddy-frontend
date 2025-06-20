import useSWR from "swr";
import axios from "axios";

export function useDoubtSolver() {
  const { data, mutate, isLoading, error } = useSWR("/api/doubts", async () => {
    const res = await axios.get("/api/doubts");
    return res.data;
  });

  const askDoubt = async (question: string, subject: string, topic: string) => {
    const res = await axios.post("/api/doubts/ask", { question, subject, topic });
    mutate();
    return res.data;
  };

  return {
    doubts: data || [],
    isLoading,
    error,
    askDoubt
  };
}
