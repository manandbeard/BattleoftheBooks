import React from 'react';
import { School, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegionDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Regional Overview</h1>
        <p className="text-gray-600 mt-1">Manage schools, approve coaches, and verify team rosters for your region.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<School className="w-6 h-6 text-blue-600" />} title="Registered Schools" value="24" />
        <StatCard icon={<Users className="w-6 h-6 text-purple-600" />} title="Pending Coaches" value="5" alert />
        <StatCard icon={<CheckCircle2 className="w-6 h-6 text-green-600" />} title="Verified Teams" value="42 / 50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Schools in Region</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {/* Mock Data Rows */}
            <SchoolRow name="Lincoln High School" district="Portland Public Schools" teams={4} status="Ready" />
            <SchoolRow name="Grant High School" district="Portland Public Schools" teams={3} status="Pending Rosters" />
            <SchoolRow name="Franklin High School" district="Portland Public Schools" teams={5} status="Ready" />
            <SchoolRow name="Roosevelt High School" district="Portland Public Schools" teams={2} status="No Coach Approved" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Action Required
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm font-medium text-amber-900">5 Coach Accounts Pending Approval</p>
              <button className="mt-2 text-sm bg-amber-100 text-amber-800 px-3 py-1.5 rounded hover:bg-amber-200 transition-colors">
                Review Now
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-900">State Announcement</p>
              <p className="text-xs text-blue-700 mt-1">Please ensure all team rosters are finalized by Friday.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, alert = false }: { icon: React.ReactNode, title: string, value: string, alert?: boolean }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center gap-4 relative overflow-hidden">
      {alert && <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />}
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

function SchoolRow({ name, district, teams, status }: { name: string, district: string, teams: number, status: string }) {
  const isReady = status === 'Ready';
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{district}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{teams} Teams</p>
          <p className={`text-xs font-medium ${isReady ? 'text-green-600' : 'text-amber-600'}`}>
            {status}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="sr-only">View</span>
          &rarr;
        </button>
      </div>
    </div>
  );
}
