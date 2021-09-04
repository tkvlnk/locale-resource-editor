import React from 'react';

import { useLocalesEditor } from '../../hooks/useLocalesEditor';

export function ExportButton({ fileName }: { fileName: string }) {
  const localesData = useLocalesEditor();

  return (
    <button
      onClick={() =>
        navigator.clipboard.writeText(
          localesData.getFormattedFileContents(fileName)
        )
      }
      type="button"
    >
      {fileName}
    </button>
  );
}
