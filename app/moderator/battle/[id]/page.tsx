'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Info, CheckCircle2, ChevronRight, AlertTriangle, Save } from 'lucide-react';
import { useParams } from 'next/navigation';

type Phase = 'SETUP' | 'IWB' | 'CONTENT' | 'CONFIRMATION' | 'COMPLETED';

export default function ScoresheetPage() {
  const params = useParams();
  const battleId = params.id as string;

  // React Query to fetch and cache battle data
  const { data: battle, isLoading } = useQuery({
    queryKey: ['battle', battleId],
    queryFn: async () => {
      const res = await fetch(`/api/battles/${battleId}`);
      if (!res.ok) throw new Error('Failed to fetch battle');
      return res.json();
    },
  });

  // Offline-capable mutation using React Query
  const syncMutation = useMutation({
    mutationFn: async (finalScore: any) => {
      const res = await fetch(`/api/battles/${battleId}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalScore),
      });
      if (!res.ok) throw new Error('Failed to sync');
      return res.json();
    },
    onMutate: async (variables) => {
      // If offline, register background sync
      if ('serviceWorker' in navigator && 'SyncManager' in window && !navigator.onLine) {
        const registration = await navigator.serviceWorker.ready;
        try {
          await (registration as any).sync.register('sync-scores');
        } catch (err) {
          console.error('Background sync failed to register', err);
        }
      }
    }
  });

  // State Machine
  const [phase, setPhase] = useState<Phase>('SETUP');
  const [qIndex, setQIndex] = useState(0); // 0-15
  
  // Scores
  const [t1Score, setT1Score] = useState(0);
  const [t2Score, setT2Score] = useState(0);
  
  // Turn tracking (alternating)
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);

  // Signatures
  const [t1Confirmed, setT1Confirmed] = useState(false);
  const [t2Confirmed, setT2Confirmed] = useState(false);

  if (isLoading || !battle) {
    return <div className="flex justify-center p-12"><div className="animate-pulse text-slate-400">Loading offline cache...</div></div>;
  }

  const questions = battle.questions;
  const currentQ = questions[qIndex];
  const isIWB = currentQ?.type === 'IWB';
  const activeTeamName = currentTeam === 1 ? battle.team1.name : battle.team2.name;
  const opposingTeamName = currentTeam === 1 ? battle.team2.name : battle.team1.name;

  const handleScore = (points: number, team: 1 | 2) => {
    if (team === 1) setT1Score(prev => prev + points);
    if (team === 2) setT2Score(prev => prev + points);
  };

  const nextQuestion = () => {
    if (qIndex < 15) {
      setQIndex(prev => prev + 1);
      setCurrentTeam(prev => prev === 1 ? 2 : 1); // Alternate turns
      if (qIndex === 7) setPhase('CONTENT');
    } else {
      setPhase('CONFIRMATION');
    }
  };

  const finalizeBattle = () => {
    syncMutation.mutate({
      battleId,
      team1Score: t1Score,
      team2Score: t2Score,
      completedAt: new Date().toISOString(),
    });
    setPhase('COMPLETED');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Scoreboard Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex justify-between items-center sticky top-16 z-40">
        <div className={`text-center flex-1 ${currentTeam === 1 && phase !== 'SETUP' && phase !== 'CONFIRMATION' && phase !== 'COMPLETED' ? 'ring-2 ring-indigo-500 rounded-lg p-2 bg-indigo-50' : 'p-2'}`}>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">{battle.team1.name}</div>
          <div className="text-3xl font-black text-slate-900">{t1Score}</div>
        </div>
        <div className="px-4 text-slate-300 font-bold text-xl">VS</div>
        <div className={`text-center flex-1 ${currentTeam === 2 && phase !== 'SETUP' && phase !== 'CONFIRMATION' && phase !== 'COMPLETED' ? 'ring-2 ring-indigo-500 rounded-lg p-2 bg-indigo-50' : 'p-2'}`}>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">{battle.team2.name}</div>
          <div className="text-3xl font-black text-slate-900">{t2Score}</div>
        </div>
      </div>

      {/* Phase: SETUP */}
      {phase === 'SETUP' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center animate-in fade-in zoom-in-95">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Ready to Begin?</h1>
          <p className="text-slate-600 mb-8">Ensure both teams are seated and ready. The battle consists of 8 &apos;In Which Book&apos; questions followed by 8 &apos;Content&apos; questions.</p>
          <button 
            onClick={() => setPhase('IWB')}
            className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Start Battle
          </button>
        </div>
      )}

      {/* Phase: IWB or CONTENT */}
      {(phase === 'IWB' || phase === 'CONTENT') && currentQ && (
        <div className="space-y-4 animate-in slide-in-from-right-4">
          <div className="flex items-center justify-between">
            <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {phase} • Q{qIndex + 1}/16
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {activeTeamName}&apos;s Turn
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <p className="text-xl font-medium text-slate-900 leading-relaxed mb-6">
              {currentQ.text}
            </p>

            {isIWB ? (
              <div className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-indigo-900">
                      <strong>Linguistic Rule:</strong> Students may omit &quot;A&quot;, &quot;An&quot;, or &quot;The&quot; from the beginning of a title. Title and Author must be exact otherwise.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Correct Title</div>
                    <div className="text-lg font-semibold text-slate-900">{currentQ.answerTitle}</div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button onClick={() => handleScore(3, currentTeam)} className="bg-emerald-100 text-emerald-800 font-bold py-3 rounded-lg hover:bg-emerald-200 active:bg-emerald-300 transition-colors">
                        {activeTeamName} (+3)
                      </button>
                      <button onClick={() => handleScore(3, currentTeam === 1 ? 2 : 1)} className="bg-amber-100 text-amber-800 font-bold py-3 rounded-lg hover:bg-amber-200 active:bg-amber-300 transition-colors">
                        Steal: {opposingTeamName} (+3)
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Correct Author</div>
                    <div className="text-lg font-semibold text-slate-900">{currentQ.answerAuthor}</div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button onClick={() => handleScore(2, currentTeam)} className="bg-emerald-100 text-emerald-800 font-bold py-3 rounded-lg hover:bg-emerald-200 active:bg-emerald-300 transition-colors">
                        {activeTeamName} (+2)
                      </button>
                      <button onClick={() => handleScore(2, currentTeam === 1 ? 2 : 1)} className="bg-amber-100 text-amber-800 font-bold py-3 rounded-lg hover:bg-amber-200 active:bg-amber-300 transition-colors">
                        Steal: {opposingTeamName} (+2)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-1">Correct Answer</div>
                  <div className="text-lg font-semibold text-slate-900">{currentQ.answerContent}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleScore(5, currentTeam)} className="bg-emerald-100 text-emerald-800 font-bold py-4 rounded-xl hover:bg-emerald-200 active:bg-emerald-300 transition-colors">
                    Correct (+5)
                  </button>
                  <button onClick={() => handleScore(5, currentTeam === 1 ? 2 : 1)} className="bg-amber-100 text-amber-800 font-bold py-4 rounded-xl hover:bg-amber-200 active:bg-amber-300 transition-colors">
                    Steal (+5)
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={nextQuestion}
            className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all"
          >
            Next Question <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Phase: CONFIRMATION */}
      {phase === 'CONFIRMATION' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-3 mb-6 text-amber-600 bg-amber-50 p-4 rounded-xl">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <p className="text-sm font-medium">Both team spokespersons must digitally confirm the final score before it can be submitted.</p>
          </div>

          <div className="space-y-4 mb-8">
            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${t1Confirmed ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="checkbox" className="w-6 h-6 rounded text-emerald-600 focus:ring-emerald-500" checked={t1Confirmed} onChange={(e) => setT1Confirmed(e.target.checked)} />
              <div className="flex-1">
                <div className="font-bold text-slate-900">{battle.team1.name}</div>
                <div className="text-sm text-slate-500">I confirm the final score is {t1Score}</div>
              </div>
            </label>

            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${t2Confirmed ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="checkbox" className="w-6 h-6 rounded text-emerald-600 focus:ring-emerald-500" checked={t2Confirmed} onChange={(e) => setT2Confirmed(e.target.checked)} />
              <div className="flex-1">
                <div className="font-bold text-slate-900">{battle.team2.name}</div>
                <div className="text-sm text-slate-500">I confirm the final score is {t2Score}</div>
              </div>
            </label>
          </div>

          <button 
            onClick={finalizeBattle}
            disabled={!t1Confirmed || !t2Confirmed || syncMutation.isPending}
            className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {syncMutation.isPending ? 'Saving...' : (
              <><Save className="w-5 h-5" /> Submit Final Score</>
            )}
          </button>
        </div>
      )}

      {/* Phase: COMPLETED */}
      {phase === 'COMPLETED' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Battle Complete</h1>
          <p className="text-slate-600 mb-8">The scores have been securely saved. If you are offline, they will sync automatically when your connection is restored.</p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8 inline-block text-left w-full max-w-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-slate-600">{battle.team1.name}</span>
              <span className="font-bold text-xl text-slate-900">{t1Score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">{battle.team2.name}</span>
              <span className="font-bold text-xl text-slate-900">{t2Score}</span>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = '/moderator'}
            className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
