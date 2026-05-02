import React from 'react';
import Link from 'next/link';
import { MapPin, Users, CheckCircle, LayoutDashboard } from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';

export default function RegionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col">
        <div className="p-6 border-b border-emerald-800">
          <h2 className="text-xl font-bold tracking-tight">Regional Chair</h2>
          <p className="text-emerald-300 text-sm mt-1">County Administration</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/region" className="flex items-center gap-3 px-3 py-2 rounded-md bg-emerald-800 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/region/schools" className="flex items-center gap-3 px-3 py-2 rounded-md text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors">
            <MapPin className="w-5 h-5" />
            Schools
          </Link>
          <Link href="/region/coaches" className="flex items-center gap-3 px-3 py-2 rounded-md text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            Coach Approvals
          </Link>
          <Link href="/region/readiness" className="flex items-center gap-3 px-3 py-2 rounded-md text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors">
            <CheckCircle className="w-5 h-5" />
            Tournament Readiness
          </Link>
        </nav>
        <div className="p-4 border-t border-emerald-800">
          <SignOutButton className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Region 4 (Multnomah County)</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
              RC
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
