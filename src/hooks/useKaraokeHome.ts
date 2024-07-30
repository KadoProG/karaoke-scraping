import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { useCopyToClipboard } from '@/components/context/CopyContextProvider';

const karaokeFetcher = async (options: { url: string; meta: IMeta }) =>
  await axios
    .get(options.url, {
      params: {
        ...options.meta,
      },
    })
    .then((response) => response.data);

export const useKaraokeHome = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const [meta, setMeta] = React.useState<IMetaSearch>({
    page: 1,
    perPage: 20,
    search: '',
  });

  const { data, isLoading } = useSWR({ url: '/api/karaoke', meta }, karaokeFetcher, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const damAiTableData = React.useMemo(() => (data?.list as IDamAiRecord[]) ?? [], [data]);

  const damAiTableMeta = React.useMemo(
    () => (data?.meta as IMeta) ?? { page: 1, perPage: 20, total: 0, totalPage: 0 },
    [data]
  );

  const handleCopyClick = React.useCallback(() => {
    copyToClipboard(JSON.stringify(damAiTableData, null, 2));
  }, [damAiTableData, copyToClipboard]);

  const handleCopyClickWithoutId = React.useCallback(() => {
    copyToClipboard(
      JSON.stringify(
        damAiTableData?.map((v) => {
          const { ...rest } = v;
          return rest;
        }),
        null,
        2
      )
    );
  }, [damAiTableData, copyToClipboard]);

  return {
    meta,
    setMeta,
    isLoading,
    damAiTableData,
    damAiTableMeta,
    handleCopyClick,
    handleCopyClickWithoutId,
  };
};
