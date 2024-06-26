import { parseString } from "xml2js";

/**
 * Convert XML to JSON
 *
 * `axios.get(url).then((res)=> res.data)`で取得したデータ（XML）をJSONデータに変換できる
 * @param data XML data (string)
 * @returns JSON data (object)
 */
export const convertXmlToJson = async (data: string) => {
  return await new Promise((resolve, reject) => {
    parseString(data, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
