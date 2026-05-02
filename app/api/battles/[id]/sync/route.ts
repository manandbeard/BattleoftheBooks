import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const battleId = (await params).id;
    const body = await request.json();
    console.log(`[SYNC] Received offline score sync for battle ${battleId}:`, body);
    
    // In a real app, we would update the database here via Prisma
    
    return NextResponse.json({ success: true, syncedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sync' }, { status: 500 });
  }
}
