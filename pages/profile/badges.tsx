import { useBadges } from "@/hooks/useBadges";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BadgesPage() {
  const { badges, isLoading, claimBadge } = useBadges();

  if (isLoading) return <p>Loading badges...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">My Badges</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge: any) => (
          <Card key={badge._id} className="p-4 text-center space-y-2">
            <img src={badge.icon} alt={badge.name} className="w-12 h-12 mx-auto" />
            <p className="font-semibold">{badge.name}</p>
            <p className="text-sm text-muted-foreground">{badge.xpRequired} XP</p>

            {badge.claimed ? (
              <p className="text-green-600 font-medium">Claimed ✅</p>
            ) : (
              <Button onClick={() => claimBadge(badge._id)}>Claim</Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
