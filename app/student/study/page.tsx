'use client';

import React, { useState } from 'react';
import { Plus, BrainCircuit, Share2, Search } from 'lucide-react';

export default function StudyToolsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [book, setBook] = useState('1');

  const [flashcards, setFlashcards] = useState([
    { id: '1', book: 'The Lightning Thief', q: 'What is the name of Percy\'s sword?', a: 'Anaklusmos (Riptide)', author: 'Alex' },
    { id: '2', book: 'Holes', q: 'What is the secret ingredient in the Warden\'s nail polish?', a: 'Rattlesnake venom', author: 'Jordan' },
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    
    setFlashcards([
      { id: Date.now().toString(), book: 'The Lightning Thief', q: question, a: answer, author: 'You' },
      ...flashcards
    ]);
    
    setQuestion('');
    setAnswer('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Flashcards</h1>
          <p className="text-slate-600 mt-1">Create and study practice questions with your teammates.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          Create Flashcard
        </button>
      </div>

      {isCreating && (
        <div className="bg-white rounded-xl shadow-sm border border-sky-200 p-6 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-sky-600" />
            Author a Practice Question
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Book</label>
              <select 
                value={book}
                onChange={(e) => setBook(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="1">The Lightning Thief</option>
                <option value="2">A Wrinkle in Time</option>
                <option value="3">Holes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Question</label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                rows={2}
                placeholder="e.g., In which book does a character discover they are a demigod?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Answer</label>
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                rows={2}
                placeholder="The Lightning Thief by Rick Riordan"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md font-medium">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 font-medium flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share with Team
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search flashcards..." 
              className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {flashcards.map((card) => (
            <div key={card.id} className="border border-slate-200 rounded-xl p-5 hover:border-sky-300 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded-md">{card.book}</span>
                <span className="text-xs text-slate-400">By {card.author}</span>
              </div>
              <p className="font-medium text-slate-900 mb-4">{card.q}</p>
              
              <div className="relative">
                <div className="absolute inset-0 bg-slate-100 rounded-lg flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 cursor-pointer">
                  <span className="text-sm font-medium text-slate-500">Hover to reveal answer</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium text-emerald-800">{card.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
