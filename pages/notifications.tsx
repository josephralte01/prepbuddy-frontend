import { useEffect, useState } from "react";
import api from "../lib/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications/me");
    setNotifications(res.data);
  };

  const markAsRead = async (id: string) => {
    await api.patch(`/notifications/${id}/read`);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={`p-4 rounded shadow cursor-pointer ${
                notif.isRead ? "bg-white" : "bg-blue-50"
              }`}
              onClick={() => markAsRead(notif._id)}
            >
              <p className="font-semibold">{notif.title}</p>
              <p className="text-sm text-gray-600">{notif.message}</p>
              {!notif.isRead && <span className="text-xs text-blue-500">Unread</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
