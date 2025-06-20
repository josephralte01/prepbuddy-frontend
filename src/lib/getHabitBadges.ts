// === lib/getHabitBadges.ts ===

export function getHabitBadges(progressMap: Record<string, { streak?: number }> = {}) {
  const badges: string[] = [];
  const streaks = Object.values(progressMap).map((p) => p.streak || 0);

  if (streaks.some((s) => s >= 7)) badges.push('🔁 7-day Habit Streak');
  if (streaks.some((s) => s >= 30)) badges.push('🔥 30-day Habit Beast');

  return badges;
}
