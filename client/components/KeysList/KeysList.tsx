import React, { useState } from 'react';

import { useLocalesEditor } from '../../hooks/useLocalesEditor';
import { LocaleValueEditor } from '../LocaleValueEditor/LocaleValueEditor';

export const KeysList = () => {
  const localesData = useLocalesEditor();

  const [hideCompleted, setHideCompleted] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => localesData.uploadData({ shouldUnflatten: true })}
      >
        Save!
      </button>

      <div>
        <label>
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={(event) => setHideCompleted(event.target.checked)}
          />
          <span>Hide completed</span>
        </label>
      </div>
      <div>
        {localesData.allUniqueKeys
          .filter((localeKey) => {
            if (!hideCompleted) {
              return true;
            }

            return localesData.allFileNames.some(
              (fileName) => !localesData.getKeyInFile(fileName, localeKey)
            );
          })
          .map((localeKey) => (
            <LocaleValueEditor key={localeKey} localeKey={localeKey} />
          ))}
      </div>
    </div>
  );
};
