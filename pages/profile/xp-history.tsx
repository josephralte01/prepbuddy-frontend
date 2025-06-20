import { useEffect, useState } from 'react';
import { useUser } from '@/lib/useUser';
import { api } from '@/lib/api';

type XPLog = {
  _id: string;
  action: string;
  xpEarned: number;
  createdAt: string;
};

export default function XPHistoryPage() {
  const { user } = useUser();
  const [logs, setLogs] = useState<XPLog[]>([]);

  useEffect(() => {
    api.get('/api/xp-logs/my').then((res) => {
      setLogs(res.data.logs || []);
    });
  }, []);

  const totalXP = logs.reduce((sum, log) => sum + (log.xpEarned || 0), 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">📜 XP History</h1>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold">💪 Total XP Earned</p>
        <p className="text-2xl text-blue-600 font-bold">{totalXP}</p>
      </div>

      {logs.length === 0 ? (
        <p className="text-center text-gray-500">No XP logs yet</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log._id} className="border-b pb-2">
              <p className="capitalize">{log.action.replace(/_/g, ' ')}</p>
              <p className="text-sm text-gray-600">+{log.xpEarned} XP</p>
              <p className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
