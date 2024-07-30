import axios from 'axios';
import React from 'react';
import { useCopyToClipboard } from '@/components/context/CopyContextProvider';
import { useSnackbar } from '@/components/context/SnackbarContextProvider';

export const useKaraokeCopyScoringAiIds = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const { setSnackbar } = useSnackbar();

  const handleCopyScoringAiIds = React.useCallback(async () => {
    try {
      const response = await axios.get('/api/karaoke/ai-ids');
      const { scoringAiIds, meta } = response.data;

      copyToClipboard(JSON.stringify(scoringAiIds), true);
      meta.total &&
        setSnackbar(`ScoringAiIdの配列をコピーしました。合計${meta.total}件`, 'success');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setSnackbar('エラーが発生しました', 'error');
    }
  }, [copyToClipboard, setSnackbar]);

  return { handleCopyScoringAiIds };
};
