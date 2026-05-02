'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, UserPlus } from 'lucide-react';

export default function CoachApprovals() {
  const [students, setStudents] = useState([
    { id: '1', name: 'Sammy S.', age: 12, hasConsent: false, isApproved: false },
    { id: '2', name: 'Alex M.', age: 14, hasConsent: true, isApproved: false },
  ]);

  const handleConsent = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, hasConsent: true } : s));
  };

  const handleApprove = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, isApproved: true } : s));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Approvals</h1>
        <p className="text-slate-600 mt-1">Review and approve student accounts. COPPA compliance requires parental consent for students under 13.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {students.map(student => (
            <div key={student.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-slate-900">{student.name}</h3>
                  {student.age < 13 && (
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Under 13
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">Lincoln Lions • Grades 6-8 Division</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {student.age < 13 && !student.hasConsent ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 max-w-xs">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-amber-800 mb-2">COPPA Requirement: I verify that I have collected a signed physical or digital parental consent form for this student.</p>
                      <button 
                        onClick={() => handleConsent(student.id)}
                        className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded hover:bg-amber-700 font-medium w-full"
                      >
                        Verify Consent
                      </button>
                    </div>
                  </div>
                ) : !student.isApproved ? (
                  <button 
                    onClick={() => handleApprove(student.id)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Approve Account
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    Active
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
