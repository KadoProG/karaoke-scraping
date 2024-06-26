import { convertDamAiSummary, convertMeta } from "@/utils/convertData";
import { convertXmlToJson } from "@/utils/convertXmlToJson";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const url =
  "https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do";

export const GET = async (
  req: NextRequest,
  { params }: { params: { cdmCardNo: string } }
) => {
  const cdmCardNo = params.cdmCardNo;

  if (!cdmCardNo) {
    return NextResponse.json(
      { message: "cdmCardNo is required" },
      { status: 400 }
    );
  }

  await fetchDataAndSaveSQLite(cdmCardNo);

  return NextResponse.json({ message: "success" });
};

const fetchDataAndSaveSQLite = async (cdmCardNo: string) => {
  const resultList = [];
  let pageNo = 1;

  const currentMaxDamScoringAiIdData = await prisma.damAiScores.findFirst({
    orderBy: {
      scoringAiId: "desc",
    },
  });
  const currentMaxDamScoringAiId = currentMaxDamScoringAiIdData?.scoringAiId;

  let hasNext = true;

  while (hasNext) {
    const { list } = await fetchListAndSaveSqlite(cdmCardNo, pageNo);

    resultList.push(...list);

    if (
      (currentMaxDamScoringAiId &&
        list
          .map((data) => data.scoringAiId)
          .includes(currentMaxDamScoringAiId)) ||
      pageNo === 40
    ) {
      hasNext = false;
    }

    pageNo++;
  }

  try {
    const query = resultList.map((damAiScore) => {
      return prisma.damAiScores.upsert({
        where: { scoringAiId: damAiScore.scoringAiId },
        update: {},
        create: {
          ...damAiScore,
          score: Number(damAiScore.score),
        },
      });
    });

    await prisma.$transaction([...query]);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const fetchListAndSaveSqlite = async (
  cdmCardNo: string,
  pageNo: number
): Promise<{ list: IDamAiRecord[]; meta: IMeta }> => {
  console.log({ cdmCardNo, pageNo });
  const response = await axios.get(url, {
    params: {
      cdmCardNo,
      pageNo: pageNo,
      detailFlg: 1,
    },
  });

  const data = response.data;

  const resultJson = await convertXmlToJson(data);

  const list = convertDamAiSummary(resultJson);

  const meta = convertMeta(resultJson);

  return { list, meta };
};
