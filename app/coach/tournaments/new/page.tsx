'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Users, CheckCircle, Plus, Trash2, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Matchup } from '@/lib/scheduling';

export default function TournamentWizard() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [schedule, setSchedule] = useState<Matchup[]>([]);

  // Form State
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [division, setDivision] = useState('GRADES_3_5');
  
  const [rooms, setRooms] = useState([{ id: '1', name: 'Library', moderatorName: 'Mr. Smith' }]);
  const [teams, setTeams] = useState([
    { id: 't1', name: 'Lincoln Lions', selected: true },
    { id: 't2', name: 'Grant Grizzlies', selected: true },
    { id: 't3', name: 'Franklin Quakers', selected: true },
    { id: 't4', name: 'Roosevelt Riders', selected: false },
    { id: 't5', name: 'Cleveland Warriors', selected: false },
  ]);

  const handleAddRoom = () => {
    setRooms([...rooms, { id: Date.now().toString(), name: '', moderatorName: '' }]);
  };

  const handleUpdateRoom = (id: string, field: 'name' | 'moderatorName', value: string) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleRemoveRoom = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  const toggleTeam = (id: string) => {
    setTeams(teams.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  };

  const generateSchedule = async () => {
    setIsGenerating(true);
    try {
      const selectedTeams = teams.filter(t => t.selected).map(t => t.id);
      
      const response = await fetch('/api/tournaments/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          date,
          division,
          teamIds: selectedTeams,
          rooms: rooms.filter(r => r.name.trim() !== ''),
        }),
      });

      if (!response.ok) throw new Error('Failed to generate schedule');
      
      const data = await response.json();
      setSchedule(data.schedule);
      setStep(4);
    } catch (error) {
      console.error(error);
      alert("Failed to generate schedule. Ensure you have at least 2 teams and 1 room.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Host a Tournament</h1>
        <p className="text-gray-600 mt-1">Follow the steps to configure and schedule your local tournament.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {[
          { num: 1, label: 'Details', icon: <Calendar className="w-5 h-5" /> },
          { num: 2, label: 'Rooms', icon: <MapPin className="w-5 h-5" /> },
          { num: 3, label: 'Teams', icon: <Users className="w-5 h-5" /> },
          { num: 4, label: 'Schedule', icon: <CheckCircle className="w-5 h-5" /> },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center bg-gray-50 px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.num ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
              {s.icon}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-indigo-900' : 'text-gray-500'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Tournament Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tournament Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="e.g., Spring Regional Qualifier"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Start Time</label>
                  <input 
                    type="datetime-local" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age Division</label>
                  <select 
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="GRADES_3_5">Grades 3-5</option>
                    <option value="GRADES_6_8">Grades 6-8</option>
                    <option value="GRADES_9_12">Grades 9-12</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={() => setStep(2)}
                disabled={!name || !date}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Rooms & Moderators</h2>
              <button onClick={handleAddRoom} className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800">
                <Plus className="w-4 h-4" /> Add Room
              </button>
            </div>
            <p className="text-sm text-gray-600">Assign physical locations and volunteer moderators. The scheduling engine will use these to prevent double-booking.</p>
            
            <div className="space-y-3">
              {rooms.map((room, index) => (
                <div key={room.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Room Name (e.g., Library)" 
                      value={room.name}
                      onChange={(e) => handleUpdateRoom(room.id, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Moderator Name" 
                      value={room.moderatorName || ''}
                      onChange={(e) => handleUpdateRoom(room.id, 'moderatorName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-sm"
                    />
                  </div>
                  <button onClick={() => handleRemoveRoom(room.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="text-gray-600 px-6 py-2 rounded-md hover:bg-gray-100">Back</button>
              <button 
                onClick={() => setStep(3)}
                disabled={rooms.length === 0 || !rooms[0].name}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Invite Teams</h2>
            <p className="text-sm text-gray-600">Select the teams attending from your district. An odd number of teams will automatically generate a &apos;BYE&apos; round.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teams.map(team => (
                <div 
                  key={team.id} 
                  onClick={() => toggleTeam(team.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${team.selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${team.selected ? 'text-indigo-900' : 'text-gray-700'}`}>{team.name}</span>
                    {team.selected && <CheckCircle className="w-5 h-5 text-indigo-600" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="text-gray-600 px-6 py-2 rounded-md hover:bg-gray-100">Back</button>
              <button 
                onClick={generateSchedule}
                disabled={isGenerating || teams.filter(t => t.selected).length < 2}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isGenerating ? 'Generating...' : 'Generate Schedule'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Schedule Generated!</h2>
              <p className="text-gray-600 mt-2">Your round-robin tournament has been successfully scheduled.</p>
            </div>

            <div className="space-y-6">
              {/* Group schedule by round */}
              {Array.from(new Set(schedule.map(s => s.round))).map(round => (
                <div key={round} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 font-semibold text-gray-700">
                    Round {round}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {schedule.filter(s => s.round === round).map((match, idx) => {
                      const t1 = teams.find(t => t.id === match.team1Id)?.name || match.team1Id;
                      const t2 = teams.find(t => t.id === match.team2Id)?.name || match.team2Id;
                      const time = new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      
                      return (
                        <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 text-lg font-medium text-gray-900">
                              <span className="flex-1 text-right">{t1}</span>
                              <span className="text-gray-400 text-sm">vs</span>
                              <span className="flex-1">{t2}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 sm:w-48 sm:justify-end">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {match.roomName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link href="/coach" className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 font-medium">
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
