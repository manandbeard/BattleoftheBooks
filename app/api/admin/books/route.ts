import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// In a real app, you would extract the tenantId from the authenticated user's session.
const MOCK_TENANT_ID = 'mock-tenant-id';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get('division');

    const books = await prisma.book.findMany({
      where: {
        tenantId: MOCK_TENANT_ID,
        ...(division ? { division: division as any } : {}),
      },
      orderBy: { title: 'asc' },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, author, phoneticPronunciation, lexileScore, alternativeAnswers, division } = body;

    // Validate required fields
    if (!title || !author || !division) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: {
        tenantId: MOCK_TENANT_ID,
        title,
        author,
        phoneticPronunciation,
        lexileScore: lexileScore ? parseInt(lexileScore, 10) : null,
        alternativeAnswers: alternativeAnswers || [],
        division,
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Failed to create book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
