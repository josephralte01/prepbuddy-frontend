// 📁 src/components/pricing/UpgradeCTA.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

export default function UpgradeCTA({ feature }: { feature: string }) {
  return (
    <Alert variant="default" className="bg-white border shadow-sm mt-6">
      <div className="flex items-center gap-4">
        <Lock className="text-brand-600 w-6 h-6" />
        <div className="flex-1">
          <AlertTitle className="font-semibold text-brand-700">
            {feature} is a Premium Feature
          </AlertTitle>
          <AlertDescription className="text-slate-600">
            Upgrade your plan to unlock full access to {feature.toLowerCase()} and more.
          </AlertDescription>
        </div>
        <Link href="/pricing">
          <Button size="sm" variant="outline" className="whitespace-nowrap">
            Upgrade Now
          </Button>
        </Link>
      </div>
    </Alert>
  );
}
