'use client';

import axios from 'axios';
import React from 'react';
import { TextField } from '@/components/input/TextField';

const Page = () => {
  const [minPage, setMinPage] = React.useState<string>(''); // 最小ページ番号
  const [maxPage, setMaxPage] = React.useState<string>(''); // 最大ページ番号
  const [isIgnoreCurrentMaxId, setIsIgnoreCurrentMaxId] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cdmCardNo, setCdmCardNo] = React.useState<string>(
    process.env.NEXT_PUBLIC_CDM_CARD_NO ?? ''
  );

  const handleFetchListClick = React.useCallback(async () => {
    const url = `/api/karaoke/${cdmCardNo}`;
    try {
      setIsLoading(true);

      // eslint-disable-next-line no-console
      console.log({
        minPage: Number(minPage) || undefined,
        maxPage: Number(maxPage) || undefined,
        cdmCardNo,
      });
      await axios.post(url, {
        minPage: Number(minPage) || undefined,
        maxPage: Number(maxPage) || undefined,
        cdmCardNo,
        isIgnoreCurrentMaxId,
      });

      setIsLoading(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e); // エラーが発生した場合はエラーをコンソールに出力
    }
  }, [minPage, maxPage, cdmCardNo, isIgnoreCurrentMaxId]);

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
      <div style={{ display: 'flex' }}>
        <TextField
          label="最小Page"
          name="minPage"
          type="number"
          onChange={(str) => setMinPage(str)}
          value={String(minPage)}
        />
        <TextField
          label="最大Page"
          name="maxPage"
          type="number"
          onChange={(str) => setMaxPage(str)}
          value={String(maxPage)}
        />
        <label htmlFor="isIgnoreCurrentMaxId">現在の最大IDを無視する</label>
        <input
          type="checkbox"
          name="isIgnoreCurrentMaxId"
          id="isIgnoreCurrentMaxId"
          checked={isIgnoreCurrentMaxId}
          onChange={(e) => setIsIgnoreCurrentMaxId(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default Page;
