import React from 'react';
import Link from 'next/link';
import { Trophy, Users, Calendar, LayoutDashboard } from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 border-b border-indigo-800">
          <h2 className="text-xl font-bold tracking-tight">Coach Portal</h2>
          <p className="text-indigo-300 text-sm mt-1">Team Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/coach" className="flex items-center gap-3 px-3 py-2 rounded-md bg-indigo-800 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/coach/teams" className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            My Teams
          </Link>
          <Link href="/coach/approvals" className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            Student Approvals
          </Link>
          <Link href="/coach/tournaments/new" className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors">
            <Trophy className="w-5 h-5" />
            Host Tournament
          </Link>
          <Link href="/coach/schedule" className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
            My Schedule
          </Link>
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <SignOutButton className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Lincoln High School</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
              C
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
