// === components/auth/RegisterForm.tsx ===
'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', form);
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create your PrepBuddy account</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
