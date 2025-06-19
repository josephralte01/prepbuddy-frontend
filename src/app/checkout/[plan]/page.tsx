// 📁 app/checkout/[plan]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth';

export default function CheckoutPage() {
  const { plan } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  const handleCheckout = () => {
    // TODO: Integrate Razorpay logic here
    alert(`Redirecting to Razorpay checkout for ${plan} plan...`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <h1 className="text-3xl font-bold mb-4 font-display text-center">
        Upgrade to {String(plan).toUpperCase()} Plan
      </h1>
      <p className="text-slate-600 mb-6 text-center max-w-md">
        Unlock advanced features including study materials, mock tests, previous year papers, leaderboard access and mentor support.
      </p>
      <Button size="lg" onClick={handleCheckout}>
        Proceed to Payment
      </Button>
    </main>
  );
}
