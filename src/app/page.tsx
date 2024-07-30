'use client';

import React from 'react';
import { BarChart } from '@/components/dataDisplay/BarChart';
import { DamAiTable } from '@/components/domains/damAi/DamAiTable';
import { TextField } from '@/components/input/TextField';
import Pagination from '@/components/navigation/Pagination';
import { useKaraokeCopyScoringAiIds } from '@/hooks/useKaraokeCopyScoringAiIds';
import { useKaraokeHome } from '@/hooks/useKaraokeHome';

const Page = () => {
  const {
    meta,
    setMeta,
    isLoading,
    damAiTableData,
    damAiTableMeta,
    handleCopyClick,
    handleCopyClickWithoutId,
  } = useKaraokeHome();

  const { handleCopyScoringAiIds } = useKaraokeCopyScoringAiIds();

  return (
    <div style={{ padding: 10 }}>
      <h1>カラオケ取得APIを試す</h1>
      <div style={{ display: 'flex' }}>
        <p>合計：{damAiTableMeta.total}</p>
        <TextField
          label="表示数"
          name="perPage"
          type="number"
          value={String(meta.perPage) ?? ''}
          onChange={(value) => setMeta({ ...meta, perPage: Number(value) })}
        />
      </div>
      <Pagination
        page={damAiTableMeta.currentPage ?? 1}
        totalPages={damAiTableMeta.lastPage ?? 0}
        onPageChange={(num) => setMeta({ ...damAiTableMeta, page: num })}
      />
      <TextField
        label="検索"
        name="search"
        type="text"
        value={meta.search ?? ''}
        onChange={(value) => setMeta({ ...meta, search: value })}
      />
      <div>{isLoading && <span>取得中...</span>}</div>
      <button disabled={!damAiTableData} onClick={handleCopyClick}>
        データをコピー
      </button>
      <button disabled={!damAiTableData} onClick={handleCopyClickWithoutId}>
        IDなしでデータをコピー
      </button>

      <button onClick={handleCopyScoringAiIds}>ScoringAiIdの配列をコピー</button>

      <DamAiTable data={damAiTableData || []} />
      <Pagination
        page={damAiTableMeta.currentPage ?? 1}
        totalPages={damAiTableMeta.lastPage ?? 0}
        onPageChange={(num) => setMeta({ ...damAiTableMeta, page: num })}
      />
      <BarChart
        data={
          damAiTableData.map((v) => ({
            label: `${v.contentsName} ${v.artistName}`,
            value: Number(v.score) / 1000,
          })) || []
        }
      />
    </div>
  );
};

export default Page;
