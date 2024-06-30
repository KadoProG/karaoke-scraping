import { useCopyToClipboard } from "@/components/context/CopyContextProvider";
import { useSnackbar } from "@/components/context/SnackbarContextProvider";
import axios from "axios";
import React from "react";

export const useKaraokeCopyScoringAiIds = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const { setSnackbar } = useSnackbar();

  const handleCopyScoringAiIds = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/karaoke/ai-ids");
      const { scoringAiIds, meta } = response.data;

      copyToClipboard(JSON.stringify(scoringAiIds, null, 2));
      meta.total &&
        setSnackbar(
          `ScoringAiIdの配列をコピーしました。合計${meta.total}件`,
          "success"
        );
    } catch (e) {
      console.error(e);
      setSnackbar("エラーが発生しました", "error");
    }
  }, [copyToClipboard, setSnackbar]);

  return { handleCopyScoringAiIds };
};
