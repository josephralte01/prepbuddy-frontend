import { useEffect, useState } from 'react';
import axios from 'axios';

export function StreakReminderCard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get('/api/users/me/streak-reminder').then((res) => {
      setShow(res.data.needsReminder);
    });
  }, []);

  if (!show) return null;

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-400 rounded-xl mb-4">
      <p className="text-yellow-800 font-medium">
        You missed yesterday — complete a chapter today to keep your streak alive! 🔥
      </p>
    </div>
  );
}
