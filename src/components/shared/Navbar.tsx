// src/components/shared/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">PrepBuddy</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="h-6 w-6 text-blue-600" />
        </button>
        <div className={cn("md:flex gap-6 items-center hidden", open && "block mt-4")}>
          <Link href="/mock-tests" className="text-slate-700 hover:text-blue-600">Mock Tests</Link>
          <Link href="/pricing" className="text-slate-700 hover:text-blue-600">Pricing</Link>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</Link>
        </div>
      </div>
    </nav>
  )
}
