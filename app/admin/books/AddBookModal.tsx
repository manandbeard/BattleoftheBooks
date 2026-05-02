'use client';

import React, { useState } from 'react';
import { X, Search, Loader2, Book as BookIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addBook, lookupBook } from './actions';
import Image from 'next/image';

type AgeDivision = 'GRADES_3_5' | 'GRADES_6_8' | 'GRADES_9_12';

interface AddBookModalProps {
  tenantId: string;
  onClose: () => void;
}

export default function AddBookModal({ tenantId, onClose }: AddBookModalProps) {
  const [isbn, setIsbn] = useState('');
  const [titleQuery, setTitleQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'isbn' | 'title'>('isbn');
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState<{
    title: string;
    author: string;
    coverImage: string;
    description: string;
  } | null>(null);
  const [division, setDivision] = useState<AgeDivision>('GRADES_3_5');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isManualEntry, setIsManualEntry] = useState(false);

  const handleManualEntry = () => {
    setBookData({
      title: '',
      author: '',
      coverImage: '',
      description: '',
    });
    setIsManualEntry(true);
  };

  const handleLookup = async () => {
    let query = '';
    if (searchMode === 'isbn') {
      if (!isbn) return;
      query = `isbn:${isbn.trim()}`;
    } else {
      if (!titleQuery) return;
      query = `intitle:${titleQuery.trim()}${authorQuery ? `+inauthor:${authorQuery.trim()}` : ''}`;
    }

    setIsLoading(true);
    setBookData(null);
    setIsManualEntry(false);
    try {
      const result = await lookupBook(query);
      
      if (result.success && result.book) {
        setBookData(result.book);
      } else {
        if (searchMode === 'isbn') {
          const fallbackResult = await lookupBook(isbn.trim());
          if (fallbackResult.success && fallbackResult.book) {
            setBookData(fallbackResult.book);
            return;
          }
        }
        
        if (searchMode === 'title') {
          const rawQuery = `${titleQuery.trim()}${authorQuery ? ` ${authorQuery.trim()}` : ''}`;
          const fallbackResult = await lookupBook(rawQuery);
          if (fallbackResult.success && fallbackResult.book) {
            setBookData(fallbackResult.book);
            return;
          }
        }

        alert(result.error || 'No book found. Please check your search terms and try again.');
      }
    } catch (error) {
      console.error('Lookup error:', error);
      alert('Failed to lookup book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookData) return;
    if (!bookData.title || !bookData.author) {
      alert('Title and Author are required.');
      return;
    }

    setIsSubmitting(true);
    const result = await addBook({
      title: bookData.title,
      author: bookData.author,
      division,
      coverImage: bookData.coverImage,
      tenantId,
    });

    if (result.success) {
      onClose();
    } else {
      alert(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookIcon className="w-5 h-5 text-indigo-600" />
            Add New Book
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!bookData && (
            <div className="space-y-6">
              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button 
                  onClick={() => setSearchMode('isbn')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${searchMode === 'isbn' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Search by ISBN
                </button>
                <button 
                  onClick={() => setSearchMode('title')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${searchMode === 'title' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Search by Title
                </button>
              </div>

              <div className="space-y-4">
                {searchMode === 'isbn' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">ISBN-10 or ISBN-13</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text"
                          value={isbn}
                          onChange={(e) => setIsbn(e.target.value)}
                          placeholder="Enter ISBN (e.g., 9780439023528)"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                          onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        />
                      </div>
                      <button 
                        onClick={handleLookup}
                        disabled={isLoading || !isbn}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Lookup'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Book Title</label>
                      <input 
                        type="text"
                        value={titleQuery}
                        onChange={(e) => setTitleQuery(e.target.value)}
                        placeholder="Enter book title..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Author (Optional)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={authorQuery}
                          onChange={(e) => setAuthorQuery(e.target.value)}
                          placeholder="Enter author name..."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                          onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        />
                        <button 
                          onClick={handleLookup}
                          disabled={isLoading || !titleQuery}
                          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 uppercase tracking-widest font-bold">OR</span>
                </div>
              </div>

              <button 
                onClick={handleManualEntry}
                className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
              >
                Enter Book Details Manually
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {bookData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="relative w-32 h-48 shrink-0">
                    {bookData.coverImage ? (
                      <Image 
                        src={bookData.coverImage} 
                        alt={bookData.title} 
                        fill
                        className="object-cover rounded-lg shadow-md border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                        <BookIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    {isManualEntry ? (
                      <div className="space-y-3">
                        <input 
                          type="text"
                          value={bookData.title}
                          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                          placeholder="Book Title"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                        />
                        <input 
                          type="text"
                          value={bookData.author}
                          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                          placeholder="Author Name"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <input 
                          type="text"
                          value={bookData.coverImage}
                          onChange={(e) => setBookData({ ...bookData, coverImage: e.target.value })}
                          placeholder="Cover Image URL (Optional)"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{bookData.title}</h3>
                        <p className="text-indigo-600 font-medium">by {bookData.author}</p>
                        <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{bookData.description}</p>
                      </>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Age Division</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['GRADES_3_5', 'GRADES_6_8', 'GRADES_9_12'] as AgeDivision[]).map((div) => (
                        <button
                          key={div}
                          type="button"
                          onClick={() => setDivision(div)}
                          className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                            division === div
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50'
                          }`}
                        >
                          {div.replace('GRADES_', '').replace('_', '-')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setBookData(null)}
                      className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      Clear
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /> Add to Official List</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
