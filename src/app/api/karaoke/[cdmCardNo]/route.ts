import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { fetchDamSiteList } from '@/app/api/karaoke/[cdmCardNo]/service';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, { params }: { params: { cdmCardNo: string } }) => {
  const cdmCardNo = params.cdmCardNo;
  if (!cdmCardNo) {
    return NextResponse.json({ message: 'cdmCardNo is required' }, { status: 400 });
  }

  const body = await req.json();

  if (!body) {
    return NextResponse.json({ message: 'request body is required' }, { status: 400 });
  }
  const { minPage, maxPage, scoringAiIds, isIgnoreCurrentMaxId } = body;

  const minPageNumber = Number(minPage) || undefined;
  const maxPageNumber = Number(maxPage) || undefined;
  const scoringAiIdsNumber = scoringAiIds?.length
    ? (scoringAiIds.map((id: string) => Number(id)).filter((id: number) => !isNaN(id)) as number[])
    : undefined;

  try {
    let currentMaxDamScoringAiId: number | undefined;
    if (!isIgnoreCurrentMaxId) {
      const currentMaxDamScoringAiIdData = await prisma.damAiScores.findFirst({
        orderBy: {
          scoringAiId: 'desc',
        },
      });

      currentMaxDamScoringAiId = Number(currentMaxDamScoringAiIdData?.scoringAiId) || undefined;
    }

    const damAiScores = await fetchDamSiteList({
      cdmCardNo,
      minPage: minPageNumber,
      maxPage: maxPageNumber,
      scoringAiIds: scoringAiIdsNumber,
      currentMaxDamScoringAiId,
    });

    // eslint-disable-next-line no-console
    console.log(damAiScores.map((damAiScore) => damAiScore.scoringAiId));

    const query = damAiScores.map((damAiScore) =>
      prisma.damAiScores.upsert({
        where: { scoringAiId: damAiScore.scoringAiId },
        update: {},
        create: {
          ...damAiScore,
          score: Number(damAiScore.score),
        },
      })
    );

    await prisma.$transaction([...query]);

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
};
