// 📁 src/components/marketing/Hero.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6 text-slate-900">
          Crack <span className="text-indigo-600">Competitive Exams</span><br />
          Faster & Smarter with PrepBuddy 🚀
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8">
          AI-powered syllabus, study materials & mock tests for JEE, NEET, UPSC, CAT & more.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/search">
            <Button size="lg">
              Start Exploring Exams <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
