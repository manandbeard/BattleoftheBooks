import React from 'react';
import Link from 'next/link';
import { Trophy, Users, BookOpen, Shield, MapPin, LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">EduTournament</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-gray-900">State Admin</Link>
            <Link href="/region" className="text-sm font-medium text-gray-600 hover:text-gray-900">Regional Chair</Link>
            <Link href="/coach" className="text-sm font-medium text-gray-600 hover:text-gray-900">Coach</Link>
            <Link href="/student" className="text-sm font-medium text-gray-600 hover:text-gray-900">Student</Link>
            <Link href="/moderator" className="text-sm font-medium text-gray-600 hover:text-gray-900">Moderator</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">Log in</Link>
            <Link href="/login" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-tight">
            The Ultimate Platform for <span className="text-indigo-600">Educational Tournaments</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Manage regions, districts, schools, and teams with our powerful multi-tenant architecture. Built for reading battles, debate clubs, and academic decathlons.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto text-base font-medium bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
              Start Free Trial
            </button>
            <button className="w-full sm:w-auto text-base font-medium bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
              View Documentation
            </button>
          </div>
        </section>

        <section className="bg-white py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Everything you need to run a tournament</h2>
              <p className="mt-4 text-lg text-gray-600">Comprehensive tools designed for state admins, regional chairs, coaches, and students.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-blue-600" />}
                title="Role-Based Access"
                description="Strict access controls for State Admins, Regional Chairs, Coaches, and Students."
              />
              <FeatureCard 
                icon={<MapPin className="w-6 h-6 text-green-600" />}
                title="Hierarchical Organization"
                description="Organize by Region, District, and School with full data isolation per tenant."
              />
              <FeatureCard 
                icon={<Users className="w-6 h-6 text-purple-600" />}
                title="Team Management"
                description="Strictly enforce 5-member rosters (4 active, 1 alternate) across different age divisions."
              />
              <FeatureCard 
                icon={<BookOpen className="w-6 h-6 text-orange-600" />}
                title="Book Database"
                description="Track titles, authors, Lexile scores, phonetic pronunciations, and alternative answers."
              />
              <FeatureCard 
                icon={<Trophy className="w-6 h-6 text-yellow-600" />}
                title="Tournament Brackets"
                description="Manage battles between teams, assign rooms, and track scores in real-time."
              />
              <FeatureCard 
                icon={<LayoutDashboard className="w-6 h-6 text-pink-600" />}
                title="Moderator Tools"
                description="Dedicated interfaces for battle moderators to score matches and manage the room."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <p>&copy; {new Date().getFullYear()} EduTournament. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
