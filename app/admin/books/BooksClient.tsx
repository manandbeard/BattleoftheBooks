'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import AddBookModal from './AddBookModal';
import Image from 'next/image';

type AgeDivision = 'GRADES_3_5' | 'GRADES_6_8' | 'GRADES_9_12';

interface Book {
  id: string;
  title: string;
  author: string;
  division: AgeDivision;
  lexileScore: number | null;
  coverImage: string | null;
}

interface BooksClientProps {
  initialBooks: Book[];
  tenantId: string;
}

export default function BooksClient({ initialBooks, tenantId }: BooksClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [divisionFilter, setDivisionFilter] = useState<string>('');

  const filteredBooks = initialBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = divisionFilter === '' || book.division === divisionFilter;
    return matchesSearch && matchesDivision;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Official Book Lists</h1>
          <p className="text-gray-500 mt-1">Manage the core reading list for all tournament divisions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 font-bold"
        >
          <Plus className="w-5 h-5" />
          Add Book
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 bg-gray-50/30">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition-all"
            />
          </div>
          <select 
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-gray-600"
          >
            <option value="">All Divisions</option>
            <option value="GRADES_3_5">Grades 3-5</option>
            <option value="GRADES_6_8">Grades 6-8</option>
            <option value="GRADES_9_12">Grades 9-12</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-4">Book Details</th>
                <th className="px-8 py-4">Division</th>
                <th className="px-8 py-4">Lexile</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-500">No books found</p>
                      <p className="text-sm">Try adjusting your search or add a new book.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="group hover:bg-indigo-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {book.coverImage ? (
                          <div className="relative w-12 h-16 shrink-0">
                            <Image 
                              src={book.coverImage} 
                              alt={book.title} 
                              fill
                              className="object-cover rounded shadow-sm border border-gray-100" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                            <BookOpen className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{book.title}</p>
                          <p className="text-sm text-gray-500 font-medium">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        book.division === 'GRADES_3_5' ? 'bg-emerald-50 text-emerald-700' :
                        book.division === 'GRADES_6_8' ? 'bg-blue-50 text-blue-700' :
                        'bg-purple-50 text-purple-700'
                      }`}>
                        {book.division.replace('GRADES_', '').replace('_', '-')}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-mono text-gray-400">
                      {book.lexileScore ? `${book.lexileScore}L` : '---'}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddBookModal 
          tenantId={tenantId} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
