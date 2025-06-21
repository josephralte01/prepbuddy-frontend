import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>PrepBuddy - Your Gateway to Competitive Exam Success</title>
        <meta name="description" content="Prepare smartly with AI-powered guidance, mock tests, and gamified learning. Join thousands of aspirants today on PrepBuddy." />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        {/* Hero Section */}
        <section className="pt-28 pb-20 px-4 text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
        >
          Your Gateway to Competitive Exam Success
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
        >
          Prepare smartly with AI-powered guidance, mock tests, and gamified learning. Join thousands of aspirants today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link href="/register">
            <Button className="px-6 py-3 text-lg font-semibold">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="px-6 py-3 text-lg font-medium">
              View Plans
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Feature Teaser */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why PrepBuddy?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Experience a complete prep platform with real-time progress tracking, AI tutoring, peer challenges, and more.
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
