/**
 * データを変換する
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */
export const convertDamAiSummary = (data: any): IDamAiRecord[] => {
  return data.document.list[0].data.map((d: any) => {
    const scoring = d.scoring[0];
    return {
      score: scoring._,
      ...scoring.$,
    };
  });
};

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
