// src/app/page.tsx
import Image from 'next/image'

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 gap-6">
      <Image
        src="/logo.png"
        alt="PrepBuddy Logo"
        width={120}
        height={120}
        className="drop-shadow-lg"
      />
      <h1 className="text-4xl font-bold text-slate-900">PrepBuddy</h1>
      <p className="text-slate-600 text-lg max-w-xl">
        Smarter Notes. Sharper Scores. Master every entrance exam with AI-powered study guides, mock tests,
        and mentor support.
      </p>
      <div className="mt-6">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
        >
          Get Started
        </a>
      </div>
    </section>
  )
}
