import { convertDataDamAiFields } from '@/utils/convertDataDamAiFields';
import { convertDataDamCommonFields } from '@/utils/convertDataDamCommonFields';
import { convertDataDamDxgFields } from '@/utils/convertDataDamDxgFields';

/**
 * ### DAMデータを変換する関数
 *
 * - 精密採点Ai
 * - 精密採点DX-G
 *
 * に対応しています。部分的にオブジェクトや配列に変換しています。
 *
 * 既存で来そうなプロパティはconvertDataDamCommonFields（scores直下）に、
 * 精密採点Aiに関するプロパティはconvertDataDamAiFields（scores.aiオブジェクト）に、
 * 精密採点DX-Gに関するプロパティはconvertDataDamDxgFields（scores.dxgオブジェクト）に分割しています。
 *
 * その他のプロパティはotherに格納しています。
 *
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */
export const convertDamScores = (data: any): any[] =>
  data.document.list[0].data?.map((d: any) => {
    const scoring = d.scoring[0];
    const scoreDetail = scoring.$;

    // 一度DAMデータの全てのキーを取得
    const allKeys = Object.keys(scoreDetail);

    // 既存のキーを取得
    const knownKeys = Object.keys(convertDataDamCommonFields(scoreDetail))
      .concat(Object.keys(convertDataDamAiFields(scoreDetail)))
      .concat(Object.keys(convertDataDamDxgFields(scoreDetail)))
      .concat(
        // eslint-disable-next-line
        Array.from({ length: 24 }, (_, i) => [
          `intervalGraphIndexSection${String(i + 1).padStart(2, '0')}`,
          `intervalGraphPointsSection${String(i + 1).padStart(2, '0')}`,
          `aiSensitivityGraphAddPointsSection${String(i + 1).padStart(2, '0')}`,
          `aiSensitivityGraphDeductPointsSection${String(i + 1).padStart(2, '0')}`,
          `aiSensitivityGraphIndexSection${String(i + 1).padStart(2, '0')}`,
          `expressionGraphPointsSection${String(i + 1).padStart(2, '0')}`,
          `expressionGraphIndexSection${String(i + 1).padStart(2, '0')}`,
        ]).flat()
      );

    // その他のキーを取得
    const otherKeys = allKeys.filter((key) => !knownKeys.includes(key));

    // その他のキー・バリューを取得
    const other = otherKeys.reduce(
      (acc, key) => {
        acc[key] = scoreDetail[key];
        return acc;
      },
      {} as Record<string, any>
    );

    // 最終的に完成されるオブジェクト
    const result: any = {
      score: scoring._,
      ...convertDataDamCommonFields(scoreDetail),
      other,
    };

    if (scoreDetail.scoringAiId) {
      result.ai = convertDataDamAiFields(scoreDetail);
      result.scoringAiId = scoreDetail.scoringAiId;
    }

    if (scoreDetail.scoringDxgId) {
      result.dxg = convertDataDamDxgFields(scoreDetail);
      result.scoringDxgId = scoreDetail.scoringDxgId;
    }

    return result;
  }) ?? [];

/**
 * メタデータを変換する
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */
export const convertMeta = (data: any): IMeta => {
  const page = data.document.data[0].page[0];
  return {
    currentPage: Number(page._),
    total: Number(page.$.dataCount),
    lastPage: Number(page.$.pageCount),
  };
};
