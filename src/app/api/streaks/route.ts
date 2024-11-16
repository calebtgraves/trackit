'use server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
export async function GET() {
  try {
    const userId = '1'; // Assuming userId is static for now
    if (!userId) {
      return NextResponse.json({ error: 'User not found' });
    }

    const streaks = await prisma.streaks.findMany({
      where: { userId: userId },
      orderBy: { created: 'desc' },
    });

    return NextResponse.json(streaks, { status: 200 });
  } catch (error) {
    console.error('Error getting streaks:', error);
    return NextResponse.json({ error: 'Error getting streaks' });
  }
}
