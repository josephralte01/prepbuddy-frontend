import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '₹0/mo',
    features: [
      'Limited mock tests',
      'Daily XP limit',
      'No streak rewards',
      'Leaderboard access',
    ],
    cta: 'Get Started',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Basic',
    price: '₹199/mo',
    features: [
      'Unlimited mock tests',
      'XP rewards + streaks',
      'Basic AI doubt support',
      'Challenge other users',
    ],
    cta: 'Upgrade Now',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '₹399/mo',
    features: [
      'All Basic features',
      'Advanced AI tutoring',
      'Priority support',
      'Exclusive competitions',
    ],
    cta: 'Go Premium',
    href: '/register',
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 md:px-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 text-gray-900"
        >
          Unlock Your Exam Potential
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-500 text-lg max-w-xl mx-auto"
        >
          PrepBuddy helps you stay on track, stay motivated, and rise up the leaderboard. Choose your plan and start preparing smarter today.
        </motion.p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 flex flex-col justify-between
              ${plan.highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-3xl font-bold text-gray-800 mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-700">
                    <Check className="h-4 w-4 text-green-500 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={plan.href}>
              <Button
                variant={plan.highlight ? 'default' : 'outline'}
                className="w-full text-base font-medium"
              >
                {plan.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Trusted by Thousands of Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <p className="text-gray-700 mb-3">
              "PrepBuddy made my NEET prep engaging and motivating. The streak rewards kept me consistent!"
            </p>
            <p className="font-semibold">— Priya S., NEET Aspirant</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <p className="text-gray-700 mb-3">
              "Mock tests felt like real exam simulations. Love the XP system and leaderboards."
            </p>
            <p className="font-semibold">— Arjun M., JEE Prepper</p>
          </div>
        </div>
      </div>
    </div>
  );
}
