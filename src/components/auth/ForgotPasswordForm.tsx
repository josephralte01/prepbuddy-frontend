// 📁 src/components/auth/ForgotPasswordForm.tsx
'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-soft border rounded-2xl">
      <CardContent className="p-8">
        <h2 className="text-2xl font-display font-bold mb-6 text-indigo-800">
          Forgot <span className="text-brand-600">Password?</span>
        </h2>
        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}
        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
