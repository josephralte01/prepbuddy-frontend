import { useState } from "react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<"week" | "month" | "all">("all");
  const { leaderboard, isLoading } = useLeaderboard(filter);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      <div className="flex gap-2">
        {["week", "month", "all"].map(tf => (
          <Button
            key={tf}
            variant={filter === tf ? "default" : "outline"}
            onClick={() => setFilter(tf as any)}
          >
            {tf === "week" ? "This Week" : tf === "month" ? "This Month" : "All Time"}
          </Button>
        ))}
      </div>

      {isLoading ? <p>Loading...</p> : leaderboard.map((user, idx) => (
        <div key={user._id} className="p-4 border rounded shadow-sm bg-white mt-4 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{user.name} (@{user.username})</p>
              <p className="text-muted-foreground text-sm">Rank #{user.rank}</p>
            </div>
            <p className="font-bold">{user.xp} XP</p>
          </div>

          <Progress value={user.xp % 100} />
          <p className="text-sm text-muted-foreground">{user.xp % 100}/100 XP to next level</p>

          {user.followsYou && !user.isFollowing && (
            <Button className="mt-2" size="sm" variant="secondary">Follow Back</Button>
          )}
        </div>
      ))}
    </div>
  );
}
