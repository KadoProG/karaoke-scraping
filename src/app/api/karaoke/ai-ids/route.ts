import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const data = await prisma.damAiScores.findMany({
      select: {
        scoringAiId: true,
      },
      orderBy: {
        scoringDateTime: 'desc',
      },
    });

    const scoringAiIds = data.map((v) => Number(v.scoringAiId));

    return NextResponse.json({
      scoringAiIds,
      meta: {
        total: scoringAiIds.length,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
};
