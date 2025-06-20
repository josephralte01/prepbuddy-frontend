// lib/utils.ts

export const getLevelBadge = (xp: number): string | null => {
  const level = Math.floor(xp / 100);
  if (level >= 10) return '💎 Master';
  if (level >= 5) return '🥈 Intermediate';
  if (level >= 1) return '🥉 Beginner';
  return null;
};
