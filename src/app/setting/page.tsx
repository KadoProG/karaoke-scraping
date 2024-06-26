"use client";

import { TextField } from "@/components/input/TextField";
import axios from "axios";
import React from "react";

const Page = () => {
  const [pageNo, setPageNo] = React.useState<number>(1); // ページ番号
  const [data, setData] = React.useState<any[] | undefined>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cdmCardNo, setCdmCardNo] = React.useState<string>(
    process.env.NEXT_PUBLIC_CDM_CARD_NO ?? ""
  );
  const [meta, setMeta] = React.useState<IMeta | undefined>();

  const handleFetchListClick = React.useCallback(async () => {
    const url = `/api/karaoke/${cdmCardNo}`;
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        params: { pageNo, detailFlg: 1 },
      });
      const data = response.data;
      setIsLoading(false);
      setData(data.list);
      setMeta(data.meta);
    } catch (e) {
      console.error(e); // エラーが発生した場合はエラーをコンソールに出力
    }
  }, [pageNo, cdmCardNo]);

  return (
    <div style={{ padding: 10 }}>
      <h1>カラオケ取得APIを試す</h1>
      <TextField
        label="カード番号"
        value={cdmCardNo}
        name="cdmCardNo"
        type="text"
        onChange={setCdmCardNo}
      />
      <div>
        <button onClick={handleFetchListClick}>APIを取得</button>
        {isLoading && <span>取得中...</span>}
      </div>
      <div>
        <TextField
          label="ページ番号"
          name="pageNo"
          type="number"
          onChange={(str) => setPageNo(Number(str))}
          value={String(pageNo)}
        />
        <button onClick={() => setPageNo((prev) => prev - 1)}>Prev</button>
        <button onClick={() => setPageNo((prev) => prev + 1)}>Next</button>
      </div>
      <TextField
        label="取得したデータ"
        value={JSON.stringify(data, null, 2)}
        name="data"
        type="text"
        multiline
      />
    </div>
  );
};

export default Page;
