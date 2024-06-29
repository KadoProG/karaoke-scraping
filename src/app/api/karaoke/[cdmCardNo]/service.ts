import { convertDamAiScores, convertMeta } from "@/utils/convertData";
import { convertXmlToJson } from "@/utils/convertXmlToJson";
import axios from "axios";

const cdmCardNo = process.env.CDM_CARD_NO;

const url =
  "https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do";

export const fetchDamAiSite = async (options: {
  pageNo?: number;
  scoringAiId?: number;
}): Promise<{ list: any[]; meta: IMeta }> => {
  const params = {
    cdmCardNo,
    pageNo: options.pageNo ?? undefined,
    scoringAiId: options.scoringAiId ?? undefined,
    detailFlg: 1,
  };

  try {
    const response = await axios.get(url, { params });

    const data = response.data;
    const resultJson = await convertXmlToJson(data);
    const list = convertDamAiScores(resultJson);

    const meta = convertMeta(resultJson);
    return { list, meta };
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    return { list: [], meta: { currentPage: 0, total: 0, lastPage: 0 } };
  }
};

export const fetchDamSiteList = async (options: {
  minPage?: number;
  maxPage?: number;
  scoringAiIds?: number[];
  currentMaxDamScoringAiId?: number;
}) => {
  const resultList = [];
  let pageNo = options.minPage || 1;
  const maxPageNo = options.maxPage || 40;
  let remainingScoringAiIds: number[] = options.scoringAiIds || [];

  while (true) {
    console.log(`${pageNo}ページ目を取得しています...`);
    const { list } = await fetchDamAiSite({ pageNo });

    if (list.length === 0) break;

    resultList.push(...list);

    if (pageNo >= maxPageNo) break;

    const scoringAiIds = list.map((data) => data.scoringAiId);
    remainingScoringAiIds = remainingScoringAiIds.filter((id) =>
      scoringAiIds.includes(id)
    );

    if (
      options.currentMaxDamScoringAiId &&
      scoringAiIds.includes(options.currentMaxDamScoringAiId)
    )
      break;

    pageNo += 1;
  }

  // 残りのAiデータを取得
  await Promise.all(
    remainingScoringAiIds.map(async (scoringAiId) => {
      console.log(`${scoringAiId}のデータを取得します`);
      const { list } = await fetchDamAiSite({ scoringAiId });
      resultList.push(...list);
    })
  );

  return resultList;
};
