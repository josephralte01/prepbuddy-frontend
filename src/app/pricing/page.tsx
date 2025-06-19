// 📁 app/pricing/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tiers = [
  {
    name: 'Free',
    price: '₹0',
    features: [
      'Search any exam',
      'View syllabus',
      'Limited mock tests',
    ],
    cta: '/register',
  },
  {
    name: 'Basic',
    price: '₹299/mo',
    features: [
      'All Free features',
      'Unlimited mock tests',
      'Study materials access',
    ],
    cta: '/checkout/basic',
  },
  {
    name: 'Premium',
    price: '₹499/mo',
    features: [
      'All Basic features',
      'Previous year solved papers',
      'Leaderboard & Ask Mentor',
    ],
    cta: '/checkout/premium',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-display font-bold mb-8 text-slate-800">
        Choose Your Prep Plan
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-2xl border bg-white p-6 shadow-soft flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 text-brand-700">{tier.name}</h2>
              <p className="text-slate-600 mb-4">{tier.price}</p>
              <ul className="text-left space-y-2 mb-6 text-sm">
                {tier.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
            <Link href={tier.cta}>
              <Button className="w-full">{tier.name === 'Free' ? 'Get Started' : 'Upgrade'}</Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
