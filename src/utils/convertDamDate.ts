/**
 * 日付文字列をDateオブジェクトに変換する
 * @param dateString 日付文字列 (YYYYMMDDHHmmss) ex. 20210101235959
 * @returns Dateオブジェクト ex. Fri Jan 01 2021 23:59:59 GMT+0900 (日本標準時)
 */
export const convertDamDate = (dateString: string) => {
  // 年、月、日、時、分、秒をそれぞれ抽出する
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // 月は0から始まるため、1を引く
  const day = parseInt(dateString.slice(6, 8), 10);
  const hour = parseInt(dateString.slice(8, 10), 10);
  const minute = parseInt(dateString.slice(10, 12), 10);
  const second = parseInt(dateString.slice(12, 14), 10);

  // Dateオブジェクトを作成する
  const date = new Date(year, month, day, hour, minute, second);

  return date;
};
