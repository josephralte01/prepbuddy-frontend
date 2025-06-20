import { useHabitRewards } from "@/hooks/useHabitRewards";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function HabitsPage() {
  const { habits, xp, streak, rewardClaims, isLoading } = useHabitRewards();

  if (isLoading) return <p>Loading...</p>;

  const xpLevel = Math.floor(xp / 100);
  const xpProgress = xp % 100;

  const rewards = [
    { days: 3, xp: 25 },
    { days: 7, xp: 50 }
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Daily Habits</h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-2 border">
        <p className="font-semibold">Level {xpLevel}</p>
        <Progress value={xpProgress} />
        <p className="text-sm text-muted-foreground">{xpProgress}/100 XP to next level</p>
        <p className="text-green-600 mt-2">🔥 Current Streak: {streak} days</p>
      </div>

      <div className="space-y-2">
        {rewards.map(r => (
          <Card key={r.days} className="p-4 flex justify-between items-center">
            <CardContent>
              <p>🎁 {r.days}-Day Streak Reward</p>
              <p className="text-muted-foreground text-sm">{r.xp} XP</p>
            </CardContent>
            {streak >= r.days ? (
              rewardClaims.includes(r.days) ? (
                <Button disabled variant="outline">Claimed ✅</Button>
              ) : (
                <Button disabled variant="default">Auto Claimed</Button>
              )
            ) : (
              <Button disabled variant="secondary">Locked</Button>
            )}
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        {habits.map((goal: any, idx: number) => (
          <Card key={idx} className="flex justify-between items-center p-4">
            <CardContent>
              <p className="capitalize">{goal.type.replace("_", " ")}</p>
            </CardContent>
            <Button
              disabled={goal.completed}
              onClick={() => alert("Handled by useHabits.ts")}
            >
              {goal.completed ? "Done ✅" : "Mark Done"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
