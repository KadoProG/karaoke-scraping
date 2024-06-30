import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    const data = await prisma.damAiScores.findMany({
      select: {
        scoringAiId: true,
      },
      orderBy: {
        scoringDateTime: "desc",
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
    console.error(e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
};
