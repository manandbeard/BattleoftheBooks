'use client';

import React, { useState } from 'react';
import { BookOpen, CheckCircle, Circle, Trophy, Star } from 'lucide-react';

// Mock data
const MOCK_BOOKS = [
  { id: '1', title: 'The Lightning Thief', author: 'Rick Riordan' },
  { id: '2', title: 'A Wrinkle in Time', author: 'Madeleine L\'Engle' },
  { id: '3', title: 'Holes', author: 'Louis Sachar' },
  { id: '4', title: 'Matilda', author: 'Roald Dahl' },
  { id: '5', title: 'Bridge to Terabithia', author: 'Katherine Paterson' },
  { id: '6', title: 'The Giver', author: 'Lois Lowry' },
  { id: '7', title: 'Wonder', author: 'R.J. Palacio' },
  { id: '8', title: 'Out of My Mind', author: 'Sharon M. Draper' },
];

const MOCK_TEAMMATES = [
  { id: 'me', name: 'You', color: 'bg-sky-500' },
  { id: 't1', name: 'Alex', color: 'bg-indigo-500' },
  { id: 't2', name: 'Jordan', color: 'bg-emerald-500' },
  { id: 't3', name: 'Taylor', color: 'bg-amber-500' },
];

export default function TeamPage() {
  // Map bookId to userId
  const [claims, setClaims] = useState<Record<string, string>>({
    '1': 'me', '2': 't1', '3': 't2', '4': 't3', '5': 'me'
  });

  const handleClaim = (bookId: string) => {
    if (claims[bookId] === 'me') {
      // Unclaim
      const newClaims = { ...claims };
      delete newClaims[bookId];
      setClaims(newClaims);
    } else if (!claims[bookId]) {
      // Claim
      setClaims({ ...claims, [bookId]: 'me' });
    }
  };

  // Calculate stats for gamification
  const totalBooks = MOCK_BOOKS.length;
  const claimedBooks = Object.keys(claims).length;
  const coveragePercent = Math.round((claimedBooks / totalBooks) * 100);
  
  // Check if load is balanced (everyone has at least 1 book)
  const userCounts = Object.values(claims).reduce((acc, userId) => {
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const isBalanced = MOCK_TEAMMATES.every(t => userCounts[t.id] >= 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team Reading Strategy</h1>
        <p className="text-slate-600 mt-1">Divide and conquer! Claim books to read and ensure your team covers the entire list.</p>
      </div>

      {/* Gamification Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-sky-600 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-300" />
              Team Coverage: {coveragePercent}%
            </h2>
            <div className="w-full bg-white/20 rounded-full h-3 mt-3 mb-2">
              <div className="bg-yellow-300 h-3 rounded-full transition-all duration-500" style={{ width: `${coveragePercent}%` }}></div>
            </div>
            <p className="text-sky-100 text-sm">
              {claimedBooks === totalBooks 
                ? "Amazing! Your team has covered every book on the list!" 
                : `${totalBooks - claimedBooks} books left to claim. Work together to cover them all!`}
            </p>
          </div>
          
          <div className={`flex flex-col items-center p-4 rounded-xl ${isBalanced ? 'bg-white/20' : 'bg-white/10'} border border-white/20`}>
            <Star className={`w-8 h-8 mb-2 ${isBalanced ? 'text-yellow-300 fill-yellow-300' : 'text-white/50'}`} />
            <span className="font-bold text-sm text-center">Balanced Load Bonus</span>
            <span className="text-xs text-sky-100 text-center mt-1">
              {isBalanced ? "Active! Everyone is reading." : "Get everyone to read at least 1 book."}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Official Book List</h3>
          <div className="flex gap-3 text-sm">
            {MOCK_TEAMMATES.map(t => (
              <div key={t.id} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${t.color}`}></div>
                <span className="text-slate-600">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {MOCK_BOOKS.map(book => {
            const claimedBy = claims[book.id];
            const teammate = MOCK_TEAMMATES.find(t => t.id === claimedBy);
            
            return (
              <div key={book.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900">{book.title}</p>
                    <p className="text-sm text-slate-500">{book.author}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleClaim(book.id)}
                  disabled={Boolean(claimedBy && claimedBy !== 'me')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    claimedBy === 'me' 
                      ? 'bg-sky-100 text-sky-700 hover:bg-sky-200' 
                      : claimedBy 
                        ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {claimedBy ? (
                    <>
                      <div className={`w-2 h-2 rounded-full ${teammate?.color}`}></div>
                      Claimed by {teammate?.name}
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      Claim Book
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
