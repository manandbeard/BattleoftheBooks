import React from 'react';
import { Users, Trophy, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CoachDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Coach Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your teams and upcoming tournaments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="w-6 h-6 text-blue-600" />} title="Active Teams" value="3" />
        <StatCard icon={<Trophy className="w-6 h-6 text-yellow-600" />} title="Tournaments Hosted" value="1" />
        <StatCard icon={<Calendar className="w-6 h-6 text-purple-600" />} title="Upcoming Battles" value="4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Teams</h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-3">
            <TeamRow name="Lincoln Lions (Grades 3-5)" members={5} />
            <TeamRow name="Lincoln Legends (Grades 6-8)" members={5} />
            <TeamRow name="Lincoln Scholars (Grades 9-12)" members={4} alert="Needs 1 more member" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Host a Tournament</h2>
          <p className="text-gray-600 mb-6">
            Ready to host a local tournament? Use our automated scheduling wizard to invite schools, assign rooms, and generate a round-robin bracket.
          </p>
          <Link 
            href="/coach/tournaments/new"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Start Tournament Wizard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function TeamRow({ name, members, alert }: { name: string, members: number, alert?: string }) {
  return (
    <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50">
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className={`text-sm ${alert ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
          {alert || `${members} / 5 Members (4 Active, 1 Alt)`}
        </p>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <span className="sr-only">Edit</span>
        &rarr;
      </button>
    </div>
  );
}
