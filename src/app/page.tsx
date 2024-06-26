"use client";

import { useCopyToClipboard } from "@/components/context/CopyContextProvider";
import { BarChart } from "@/components/dataDisplay/BarChart";
import { DamAiTable } from "@/components/domains/damAi/DamAiTable";
import { TextField } from "@/components/input/TextField";
import Pagination from "@/components/navigation/Pagination";
import axios from "axios";
import React from "react";
import useSWR from "swr";

const karaokeFetcher = async (options: { url: string; meta: IMeta }) => {
  return await axios
    .get(options.url, {
      params: {
        ...options.meta,
      },
    })
    .then((response) => response.data);
};

const Page = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const [meta, setMeta] = React.useState<IMetaSearch>({
    page: 1,
    perPage: 20,
    search: "",
  });

  const { data, isLoading } = useSWR(
    { url: "/api/karaoke", meta },
    karaokeFetcher,
    {
      // 自動fetchの無効化
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const damAiTableData = React.useMemo(
    () => (data?.list as IDamAiRecord[]) ?? [],
    [data]
  );

  const damAiTableMeta = React.useMemo(
    () =>
      (data?.meta as IMeta) ?? { page: 1, perPage: 20, total: 0, totalPage: 0 },
    [data]
  );

  const handleCopyClick = React.useCallback(() => {
    copyToClipboard(JSON.stringify(damAiTableData, null, 2));
  }, [damAiTableData, copyToClipboard]);

  const handleCopyClickWithoutId = React.useCallback(() => {
    copyToClipboard(
      JSON.stringify(
        damAiTableData?.map((v) => {
          const { id, ...rest } = v;
          return rest;
        }),
        null,
        2
      )
    );
  }, [damAiTableData, copyToClipboard]);

  return (
    <div style={{ padding: 10 }}>
      <h1>カラオケ取得APIを試す</h1>
      <div style={{ display: "flex" }}>
        <p>合計：{damAiTableMeta.total}</p>
        <TextField
          label="表示数"
          name="perPage"
          type="number"
          value={String(meta.perPage) ?? ""}
          onChange={(value) => setMeta({ ...meta, perPage: Number(value) })}
        />
      </div>
      <Pagination
        page={damAiTableMeta.page ?? 1}
        totalPages={damAiTableMeta.totalPage ?? 0}
        onPageChange={(num) => setMeta({ ...damAiTableMeta, page: num })}
      />
      <TextField
        label="検索"
        name="search"
        type="text"
        value={meta.search ?? ""}
        onChange={(value) => setMeta({ ...meta, search: value })}
      />
      <div>{isLoading && <span>取得中...</span>}</div>
      <button disabled={!data} onClick={handleCopyClick}>
        データをコピー
      </button>
      <button disabled={!data} onClick={handleCopyClickWithoutId}>
        IDなしでデータをコピー
      </button>

      <DamAiTable data={damAiTableData || []} />
      <Pagination
        page={damAiTableMeta.page ?? 1}
        totalPages={damAiTableMeta.totalPage ?? 0}
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
