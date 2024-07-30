import axios from 'axios';
import { convertDamScores, convertMeta } from '@/utils/convertDamScores';
import { convertXmlToJson } from '@/utils/convertXmlToJson';

const url = 'https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do';

export const fetchDamAiSite = async (options: {
  cdmCardNo: string;
  pageNo?: number;
  scoringAiId?: number;
}): Promise<{ list: any[]; meta: IMeta }> => {
  if (!options.cdmCardNo) throw new Error('cdmCardNo is required');
  const params = {
    cdmCardNo: options.cdmCardNo,
    pageNo: options.pageNo ?? undefined,
    scoringAiId: options.scoringAiId ?? undefined,
    detailFlg: 1,
  };

  try {
    const response = await axios.get(url, { params });

    const data = response.data;
    const resultJson = await convertXmlToJson(data);
    const list = convertDamScores(resultJson);

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
  cdmCardNo: string;
}) => {
  // eslint-disable-next-line no-console
  console.log(options);
  const resultList = [];
  let pageNo = options.minPage || 1;
  const maxPageNo = options.maxPage || 40;
  let remainingScoringAiIds: number[] = options.scoringAiIds || [];

  // eslint-disable-next-line
  while (true) {
    // eslint-disable-next-line no-console
    console.log(`${pageNo}ページ目を取得しています...`);
    const { list } = await fetchDamAiSite({
      pageNo,
      cdmCardNo: options.cdmCardNo,
    });

    if (list.length === 0) break;

    resultList.push(...list);

    if (pageNo >= maxPageNo) break;

    const scoringAiIds = list.map((data) => Number(data.scoringAiId));
    remainingScoringAiIds = remainingScoringAiIds.filter((id) => scoringAiIds.includes(id));

    if (
      options.currentMaxDamScoringAiId &&
      scoringAiIds.includes(options.currentMaxDamScoringAiId)
    ) {
      break;
    }

    pageNo += 1;
  }

  // 残りのAiデータを取得
  await Promise.all(
    remainingScoringAiIds.map(async (scoringAiId) => {
      // eslint-disable-next-line no-console
      console.log(`${scoringAiId}のデータを取得します`);
      const { list } = await fetchDamAiSite({
        scoringAiId,
        cdmCardNo: options.cdmCardNo,
      });
      resultList.push(...list);
    })
  );

  return resultList;
};
