import { useUser } from '@/lib/useUser';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { getLevelBadge } from '@/lib/utils';
import { getHabitBadges } from '@/lib/getHabitBadges';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import Head from 'next/head';

export default function WebProfilePage() {
  const { user, mutate } = useUser();
  const [recovering, setRecovering] = useState(false);
  const [recovered, setRecovered] = useState(false);

  const calculateLevel = (xp: number) => Math.floor(xp / 100);
  const level = calculateLevel(user?.xp || 0);
  const progressToNext = ((user?.xp || 0) % 100) / 100;

  const previousLevel = useRef(level);
  useEffect(() => {
    if (level > previousLevel.current) {
      toast.success(`🎉 You've reached Level ${level}!`);
      previousLevel.current = level;
    }
  }, [level]);

  const badges: string[] = [];

  if ((user?.streak || 0) >= 7) badges.push('🔥 7-day Streak');
  if (user?.rank && user.rank <= 10) badges.push('🏆 Top 10');
  if ((user?.xp || 0) >= 1000) badges.push('🥇 1000+ XP Club');

  const levelBadge = getLevelBadge(user?.xp || 0);
  if (levelBadge) badges.push(levelBadge);

  const habitBadges = getHabitBadges(user?.habitProgress || {});
  badges.push(...habitBadges);

  if (user?.completedChallenges?.length) {
    badges.push('🎯 Challenge Master');
  }

  const showRecoveryOption = user?.streak === 0 && user?.missedStreak;

  const handleRecovery = async () => {
    setRecovering(true);
    try {
      const res = await api.post('/streak/recover');
      toast.success('🔥 Streak Recovered!');
      setRecovered(true);
      mutate();
    } catch (err) {
      toast.error('Failed to recover streak');
    } finally {
      setRecovering(false);
    }
  };

  return (
    <>
      <Head>
        <title>{user?.name ? `${user.name}'s Profile` : 'User Profile'} - PrepBuddy</title>
        <meta name="description" content={`View and manage your PrepBuddy profile. Track your progress, badges, and streaks.`} />
      </Head>
      <div className="max-w-2xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-2">{user?.name}</h1>
        <p className="text-center text-muted-foreground mb-4">{user?.email}</p>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-center">🏅 Level {level}</h2>
        {user?.rank && (
          <p className="text-center text-sm text-blue-600 dark:text-blue-400 mt-1">
            #{user.rank} on leaderboard
          </p>
        )}
        <p className="text-center text-muted-foreground mb-2">
          XP: <strong>{user?.xp || 0}</strong>
        </p>
        <Progress
          value={progressToNext * 100}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700"
        />
        <p className="text-xs text-center mt-1 text-muted-foreground">
          {Math.floor(progressToNext * 100)}% to next level
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">🔥 Current Streak</h3>
        <p className="text-muted-foreground">{user?.streak || 0} days</p>
        {showRecoveryOption && !recovered && (
          <button
            onClick={handleRecovery}
            disabled={recovering}
            className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 disabled:opacity-60"
          >
            Recover Streak
          </button>
        )}
        {recovered && (
          <p className="text-green-600 text-sm mt-2">Streak recovered successfully!</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">🎖️ Badges</h3>
        {badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full text-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No badges earned yet</p>
        )}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/profile/xp-history"
          className="text-blue-500 underline text-sm hover:text-blue-700 dark:hover:text-blue-400 transition"
        >
          View XP History →
        </Link>
      </div>
    </div>
    </>
  );
}
