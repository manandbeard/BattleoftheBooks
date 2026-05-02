import React from 'react';
import { BookOpen, Calendar, Users, Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
        <p className="text-slate-600 mt-1">Track your reading progress and prepare for the next battle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center border border-sky-100">
            <BookOpen className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Books Read</p>
            <p className="text-2xl font-bold text-slate-900">4 / 16</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <Trophy className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Team Flashcards</p>
            <p className="text-2xl font-bold text-slate-900">128</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center border border-purple-100">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Next Battle</p>
            <p className="text-lg font-bold text-slate-900">May 15</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Team Roster</h2>
            <Link href="/student/team" className="text-sm text-sky-600 font-medium hover:text-sky-700">View Details</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">S</div>
                <span className="font-medium text-slate-900">You</span>
              </div>
              <span className="text-sm text-slate-500">4 Books Claimed</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">A</div>
                <span className="font-medium text-slate-900">Alex M.</span>
              </div>
              <span className="text-sm text-slate-500">5 Books Claimed</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">J</div>
                <span className="font-medium text-slate-900">Jordan K.</span>
              </div>
              <span className="text-sm text-slate-500">4 Books Claimed</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">T</div>
                <span className="font-medium text-slate-900">Taylor R.</span>
              </div>
              <span className="text-sm text-slate-500">3 Books Claimed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Study Tools</h2>
          <p className="text-slate-600 mb-6">
            Collaborate with your team! Create flashcards for the books you&apos;ve read and test your knowledge on books your teammates read.
          </p>
          <Link 
            href="/student/study"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-colors"
          >
            Open Flashcards
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
