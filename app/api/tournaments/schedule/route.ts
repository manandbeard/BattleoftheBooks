import { NextResponse } from 'next/server';
import { generateRoundRobinSchedule } from '@/lib/scheduling';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, division, teamIds, rooms } = body;

    if (!name || !date || !teamIds || !rooms || teamIds.length < 2 || rooms.length < 1) {
      return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
    }

    const startDate = new Date(date);
    
    // Generate the schedule using the Berger tables algorithm
    const schedule = generateRoundRobinSchedule(teamIds, rooms, startDate, 30);

    // In a real app, we would save this to the database here:
    // 1. Create Tournament
    // 2. Create Rooms
    // 3. Create Battles (Matchups)
    
    return NextResponse.json({ success: true, schedule });
  } catch (error: any) {
    console.error('Scheduling error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate schedule' }, { status: 500 });
  }
}
