import React from 'react';
import { BookOpen, Megaphone, Users, MapPin } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">State Overview</h1>
        <p className="text-gray-600 mt-1">Manage the state-wide tournament settings and data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<BookOpen className="w-6 h-6 text-blue-600" />} title="Total Books" value="45" />
        <StatCard icon={<MapPin className="w-6 h-6 text-green-600" />} title="Regions" value="12" />
        <StatCard icon={<Users className="w-6 h-6 text-purple-600" />} title="Registered Teams" value="342" />
        <StatCard icon={<Megaphone className="w-6 h-6 text-orange-600" />} title="Active Announcements" value="3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4 py-2">
              <h3 className="font-medium text-gray-900">State Finals Date Change</h3>
              <p className="text-sm text-gray-500 mt-1">The state finals have been moved to May 15th.</p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4 py-2">
              <h3 className="font-medium text-gray-900">New Book Added to Grades 6-8</h3>
              <p className="text-sm text-gray-500 mt-1">&quot;The Giver&quot; has been added as an alternate.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span className="font-medium text-gray-700">Publish New Announcement</span>
              <span className="text-indigo-600">&rarr;</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span className="font-medium text-gray-700">Manage Book Lists</span>
              <span className="text-indigo-600">&rarr;</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span className="font-medium text-gray-700">View Regional Reports</span>
              <span className="text-indigo-600">&rarr;</span>
            </button>
          </div>
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
