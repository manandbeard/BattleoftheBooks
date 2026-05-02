'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleSignOut = () => {
    // Clear mock cookie
    document.cookie = 'mock_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
    router.push('/');
  };

  return (
    <button onClick={handleSignOut} className={className}>
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}
