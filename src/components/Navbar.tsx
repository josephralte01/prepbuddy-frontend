import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await api.get("/notifications/me");
        const unread = res.data.some((n) => !n.isRead);
        setHasUnread(unread);
      } catch (err) {
        console.error("Failed to fetch notifications");
      }
    };
    fetchUnread();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const isActive = (path: string) => router.pathname === path;

  const links = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/notifications", label: "Notifications", badge: hasUnread },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 shadow-md sticky top-0 z-50 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">PrepBuddy</h1>

        <div className="flex items-center gap-4">
          {/* 🌙 Theme toggle */}
          <button onClick={() => setIsDark(!isDark)} className="transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* ☰ Menu toggle on mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* 🌐 Links on desktop */}
          <div className="hidden md:flex gap-6">
            {links.map(({ href, label, badge }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm flex items-center gap-1 transition-colors ${
                  isActive(href) ? "font-bold text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-slate-300"
                }`}
              >
                {label}
                {badge && <span className="ml-1 bg-red-500 text-white text-xs px-1.5 rounded-full">●</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 📱 Mobile menu */}
      {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col gap-4">
          {links.map(({ href, label, badge }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm flex items-center gap-1 transition-colors ${
                isActive(href) ? "font-bold text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-slate-300"
              }`}
            >
              {label}
              {badge && <span className="ml-1 bg-red-500 text-white text-xs px-1.5 rounded-full">●</span>}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
