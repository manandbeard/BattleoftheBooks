'use client';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createStore, get, set, del } from 'idb-keyval';
import React, { useState, useEffect } from 'react';

// Create a custom IndexedDB store for React Query
const idbStore = typeof window !== 'undefined' ? createStore('obob-scoresheet', 'query-cache') : null;

const idbPersister = {
  persistClient: async (client: any) => {
    if (idbStore) {
      await set('react-query-cache', client, idbStore);
    }
  },
  restoreClient: async () => {
    if (idbStore) {
      return await get('react-query-cache', idbStore);
    }
    return undefined;
  },
  removeClient: async () => {
    if (idbStore) {
      await del('react-query-cache', idbStore);
    }
  },
};

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 3,
          },
          mutations: {
            retry: 5,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          }
        },
      })
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    
    // Register Service Worker for PWA and Background Sync
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('SW registered:', registration.scope))
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);

  if (!isMounted) return null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: idbPersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
