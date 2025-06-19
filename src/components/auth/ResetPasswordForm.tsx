// === components/auth/ResetPasswordForm.tsx ===
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ResetPasswordForm() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function validateToken() {
      try {
        await axios.get(`/api/auth/reset-password/${token}`);
      } catch {
        setError('Invalid or expired reset link');
      }
    }
    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Reset your password</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input
              type="password"
              id="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
