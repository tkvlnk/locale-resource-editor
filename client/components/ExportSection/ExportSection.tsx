import React from 'react';

import { useLocalesEditor } from '../../hooks/useLocalesEditor';
import { ExportButton } from '../ExportButton/ExportButton';

export function ExportSection() {
  const localesData = useLocalesEditor();

  return (
    <div>
      {localesData.allFileNames.map((fileName) => (
        <ExportButton fileName={fileName} />
      ))}
    </div>
  );
}
