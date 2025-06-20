// === frontend/src/hooks/useChallengeInviteToast.ts ===
import { useEffect } from 'react';
import { useSocket } from '@/lib/socket';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

export function useChallengeInviteToast() {
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const handleInvite = ({ from, challengeId }: { from: string; challengeId: string }) => {
      toast(
        (t) => (
          <div
            onClick={() => {
              toast.dismiss(t.id);
              router.push(`/challenges/${challengeId}`);
            }}
            className="cursor-pointer"
          >
            <b>🔥 New Challenge Invite!</b>
            <div className="text-sm">Click to view</div>
          </div>
        ),
        { duration: 5000 }
      );
    };

    socket.on('challenge:invited', handleInvite);
    return () => {
      socket.off('challenge:invited', handleInvite);
    };
  }, [socket]);
}
