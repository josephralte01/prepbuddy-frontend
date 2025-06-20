import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { useUser } from '@/lib/useUser';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Profile {
  name: string;
  username: string;
  xp: number;
  streak: number;
  rank?: number;
  followers: string[];
  following: string[];
}

export default function PublicProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!username) return;
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/users/public/${username}`);
        setProfile(res.data);
        if (user && res.data.followers.includes(user._id)) {
          setIsFollowing(true);
        }
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username, user]);

  const toggleFollow = async () => {
    if (!profile) return;
    const route = isFollowing ? 'unfollow' : 'follow';
    try {
      await api.post(`/api/social/${route}/${profile.username}`);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Error updating follow status');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!profile) return <div className="text-center mt-20 text-red-500">User not found</div>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-1">{profile.name}</h1>
      <p className="text-center text-gray-600 mb-2">@{profile.username}</p>

      <div className="flex justify-center gap-6 mb-4">
        <Link href={`/u/${profile.username}/followers`}>
          <span className="text-sm text-blue-600 underline">
            {profile.followers.length} Followers
          </span>
        </Link>
        <Link href={`/u/${profile.username}/following`}>
          <span className="text-sm text-blue-600 underline">
            {profile.following.length} Following
          </span>
        </Link>
      </div>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">XP: {profile.xp}</p>
        <p className="text-sm text-muted-foreground">🔥 Streak: {profile.streak} days</p>
        {profile.rank && (
          <p className="text-sm text-blue-600 font-medium">#{profile.rank} on leaderboard</p>
        )}
      </div>

      {user && user.username !== profile.username && (
        <div className="text-center mb-6">
          <Button onClick={toggleFollow} className="rounded-full px-6">
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      )}
    </div>
  );
}
