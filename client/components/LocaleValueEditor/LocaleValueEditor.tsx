import React from 'react';

import { useLocalesEditor } from '../../hooks/useLocalesEditor';

export const LocaleValueEditor = ({ localeKey }: { localeKey: string }) => {
  const localesData = useLocalesEditor();

  return (
    <fieldset>
      <legend>{localeKey}:</legend>

      {localesData.allFileNames.map((fileName) => (
        <div key={fileName}>
          <textarea
            rows={2}
            value={localesData.getKeyInFile(fileName, localeKey)}
            onChange={(event) =>
              localesData.setKeyInFile(fileName, localeKey, event.target.value)
            }
          />
        </div>
      ))}
    </fieldset>
  );
};
