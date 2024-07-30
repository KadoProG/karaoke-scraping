import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(req.url);
    const pageString = searchParams.get('page');
    const perPageString = searchParams.get('perPage');
    const scoringAiId = searchParams.get('scoringAiId');
    const search = searchParams.get('search');

    const page = Number(pageString) || 1;
    const perPage = Number(perPageString) || undefined;
    const skip = (page - 1) * (perPage ?? 0);

    const whereOrQuery = [];

    if (search && search.length > 0) {
      whereOrQuery.push(
        {
          contentsName: {
            contains: search,
          },
        },
        {
          artistName: {
            contains: search,
          },
        }
      );
    }

    const total = await prisma.damAiScores.count({
      where: {
        scoringAiId: scoringAiId ? scoringAiId : undefined,
        OR: whereOrQuery.length > 0 ? whereOrQuery : undefined,
      },
    });

    const data = await prisma.damAiScores.findMany({
      skip,
      take: perPage,
      where: {
        scoringAiId: scoringAiId ? scoringAiId : undefined,
        OR: whereOrQuery.length > 0 ? whereOrQuery : undefined,
      },
      orderBy: {
        scoringDateTime: 'desc',
      },
    });

    const meta: IMeta = {
      currentPage: page,
      total,
      lastPage: perPage ? Math.ceil(total / perPage) : 1,
      perPage,
      scoringAiId: scoringAiId ? Number(scoringAiId) : undefined,
    };

    return NextResponse.json({
      list: data,
      meta,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
};
