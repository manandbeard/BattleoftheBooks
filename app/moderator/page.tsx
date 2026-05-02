import React from 'react';
import Link from 'next/link';
import { Calendar, PlayCircle } from 'lucide-react';

export default function ModeratorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Moderator Dashboard</h1>
        <p className="text-slate-600 mt-1">Select a battle to begin moderating.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2 text-slate-700 font-medium">
          <Calendar className="w-5 h-5" />
          Today&apos;s Schedule
        </div>
        <div className="divide-y divide-slate-100">
          {/* Mock Battle Link */}
          <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <div className="text-sm font-bold text-slate-500 mb-1">10:00 AM • Library</div>
              <div className="font-medium text-slate-900">Lincoln Lions vs Grant Grizzlies</div>
            </div>
            <Link 
              href="/moderator/battle/mock-battle-1"
              className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <PlayCircle className="w-4 h-4" /> Start
            </Link>
          </div>
          
          <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors opacity-50">
            <div>
              <div className="text-sm font-bold text-slate-500 mb-1">11:00 AM • Library</div>
              <div className="font-medium text-slate-900">Franklin Quakers vs Roosevelt Riders</div>
            </div>
            <button className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 cursor-not-allowed">
              Waiting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
