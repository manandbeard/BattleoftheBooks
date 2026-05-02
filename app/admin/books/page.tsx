import React from 'react';
import { prisma } from '@/lib/prisma';
import BooksClient from './BooksClient';

export default async function BooksPage() {
  // In a real app, get the tenantId from the session
  const MOCK_TENANT_ID = 'mock-tenant-id';
  
  const books = await prisma.book.findMany({
    where: { tenantId: MOCK_TENANT_ID },
    orderBy: { title: 'asc' },
  });

  return <BooksClient initialBooks={books} tenantId={MOCK_TENANT_ID} />;
}
