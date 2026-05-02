import React from 'react';
import { NetworkStatus } from '@/components/NetworkStatus';

export default function ModeratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white h-14 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="font-bold tracking-tight">OBOB Moderator</div>
        <div className="flex items-center gap-3">
          <NetworkStatus />
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium">
            M
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
