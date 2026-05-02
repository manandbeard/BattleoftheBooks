import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Users, LayoutDashboard } from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-900 text-white flex flex-col">
        <div className="p-6 border-b border-sky-800">
          <h2 className="text-xl font-bold tracking-tight">Student Portal</h2>
          <p className="text-sky-300 text-sm mt-1">Lincoln Lions</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/student" className="flex items-center gap-3 px-3 py-2 rounded-md bg-sky-800 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/student/schedule" className="flex items-center gap-3 px-3 py-2 rounded-md text-sky-100 hover:bg-sky-800 hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
            Tournament Schedule
          </Link>
          <Link href="/student/study" className="flex items-center gap-3 px-3 py-2 rounded-md text-sky-100 hover:bg-sky-800 hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
            Study Tools
          </Link>
          <Link href="/student/team" className="flex items-center gap-3 px-3 py-2 rounded-md text-sky-100 hover:bg-sky-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            My Team
          </Link>
        </nav>
        <div className="p-4 border-t border-sky-800">
          <SignOutButton className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sky-100 hover:bg-sky-800 hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-sky-100 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800">Welcome back, Student!</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-medium">
              S
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
