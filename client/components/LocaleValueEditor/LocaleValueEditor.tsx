import React from 'react';

import { useLocalesEditor } from '../../hooks/useLocalesEditor';

import s from './LocaleValueEditor.module.scss';

export const LocaleValueEditor = ({ localeKey }: { localeKey: string }) => {
  const localesData = useLocalesEditor();

  return (
    <details>
      <summary>
        <code>
          <strong>{localeKey}</strong>
        </code>
      </summary>

      <div className={s.content}>
        {localesData.allFileNames.map((fileName) => (
          <label key={fileName} className={s.field}>
            <code>{fileName}</code>
            <textarea
              rows={2}
              value={localesData.getKeyInFile(fileName, localeKey)}
              onChange={(event) =>
                localesData.setKeyInFile(
                  fileName,
                  localeKey,
                  event.target.value
                )
              }
            />
          </label>
        ))}
      </div>
    </details>
  );
};
