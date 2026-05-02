import { NextResponse } from 'next/server';

// Mock data for offline testing
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const battleId = (await params).id;

  // Generate 16 mock questions (8 IWB, 8 Content)
  const questions = Array.from({ length: 16 }).map((_, i) => {
    const isIWB = i < 8;
    return {
      id: `q-${i + 1}`,
      type: isIWB ? 'IWB' : 'CONTENT',
      text: isIWB 
        ? `In which book does a character do something interesting?` 
        : `In the book "Example Title", what happens at the end?`,
      answerTitle: isIWB ? `Book Title ${i + 1}` : null,
      answerAuthor: isIWB ? `Author Name ${i + 1}` : null,
      answerContent: !isIWB ? `The correct answer is X.` : null,
    };
  });

  return NextResponse.json({
    id: battleId,
    team1: { id: 't1', name: 'Lincoln Lions' },
    team2: { id: 't2', name: 'Grant Grizzlies' },
    questions,
  });
}
