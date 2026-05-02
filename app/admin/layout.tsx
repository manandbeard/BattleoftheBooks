import React from 'react';
import Link from 'next/link';
import { BookOpen, Megaphone, LayoutDashboard, Settings } from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">State Admin</h2>
          <p className="text-slate-400 text-sm mt-1">Superuser Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/books" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
            Official Book Lists
          </Link>
          <Link href="/admin/announcements" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Megaphone className="w-5 h-5" />
            Announcements
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <SignOutButton className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Administration</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
              SA
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
