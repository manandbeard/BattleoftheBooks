import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MOCK_TENANT_ID = 'mock-tenant-id';
const MOCK_AUTHOR_ID = 'mock-author-id'; // Would come from session

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        tenantId: MOCK_TENANT_ID,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, role: true }
        }
      }
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real scenario, we'd ensure the MOCK_AUTHOR_ID actually exists in the DB first.
    // For this mock, we'll assume the user exists or we'd handle the foreign key error.
    
    const newAnnouncement = await prisma.announcement.create({
      data: {
        tenantId: MOCK_TENANT_ID,
        title,
        content,
        authorId: MOCK_AUTHOR_ID, 
      },
    });

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error('Failed to create announcement:', error);
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}
