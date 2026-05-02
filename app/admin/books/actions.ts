'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type AgeDivision = 'GRADES_3_5' | 'GRADES_6_8' | 'GRADES_9_12';

export async function lookupBook(query: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Books API error:', errorData);
      return { success: false, error: 'API request failed' };
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const info = data.items[0].volumeInfo;
      return {
        success: true,
        book: {
          title: info.title || '',
          author: info.authors ? info.authors.join(', ') : 'Unknown Author',
          coverImage: info.imageLinks ? info.imageLinks.thumbnail.replace('http://', 'https://') : '',
          description: info.description || 'No description available.',
        }
      };
    }
    
    return { success: false, error: 'No book found' };
  } catch (error) {
    console.error('Lookup server action error:', error);
    return { success: false, error: 'Network error during lookup' };
  }
}

export async function addBook(formData: {
  title: string;
  author: string;
  division: AgeDivision;
  lexileScore?: number;
  coverImage?: string;
  tenantId: string;
}) {
  try {
    // Ensure tenant exists (since we are using a mock tenant ID)
    const tenant = await prisma.tenant.findUnique({
      where: { id: formData.tenantId },
    });
    if (!tenant) {
      await prisma.tenant.create({
        data: {
          id: formData.tenantId,
          name: 'Mock Tenant',
        },
      });
    }

    await prisma.book.create({
      data: {
        title: formData.title,
        author: formData.author,
        division: formData.division,
        lexileScore: formData.lexileScore,
        coverImage: formData.coverImage,
        tenantId: formData.tenantId,
      },
    });
    revalidatePath('/admin/books');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding book:', error);
    return { success: false, error: error.message || 'Failed to add book' };
  }
}
