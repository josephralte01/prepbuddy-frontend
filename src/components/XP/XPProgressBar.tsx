// 📁 frontend/src/components/XPProgressBar.tsx
import React from 'react';

export default function XPProgressBar({ xp }: { xp: number }) {
  const level = Math.floor(xp / 100);
  const currentLevelXP = xp % 100;
  const progress = (currentLevelXP / 100) * 100;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4">
      <div
        className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
      <p className="text-xs mt-1 text-center text-gray-700 dark:text-gray-300">
        Level {level} ・ {currentLevelXP}/100 XP
      </p>
    </div>
  );
}
