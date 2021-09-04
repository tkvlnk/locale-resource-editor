import React, { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { useGlobalStates } from '../../hooks/useGlobalStates';
import { useLocalesEditor } from '../../hooks/useLocalesEditor';
import { LocaleValueEditor } from '../LocaleValueEditor/LocaleValueEditor';

import s from './KeysList.module.scss';

export const KeysList = () => {
  const localesData = useLocalesEditor();

  const hideCompleted = useRecoilValue(useGlobalStates().hideCompleted);
  const searchKeyQuery = useRecoilValue(useGlobalStates().searchKeyQuery);

  const localeKeys = useMemo(
    () =>
      localesData.allUniqueKeys
        .filter((localeKey) => {
          if (!hideCompleted) {
            return true;
          }

          return localesData.allFileNames.some(
            (fileName) => !localesData.getKeyInFile(fileName, localeKey)
          );
        })
        .filter((localeKey) =>
          localeKey
            .toLocaleUpperCase()
            .includes(searchKeyQuery.toLocaleUpperCase())
        ),
    [hideCompleted, searchKeyQuery] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className={s.root}>
      {localeKeys.length > 0 ? (
        localeKeys.map((localeKey) => (
          <LocaleValueEditor key={localeKey} localeKey={localeKey} />
        ))
      ) : (
        <div className={s.emty}>There is no translation keys 👀</div>
      )}
    </div>
  );
};

/*
.sort((leftKey, rightKey) => {
  const leftValue = localesData.allFileNames
    .map((fileName) => localesData.getKeyInFile(fileName, leftKey))
    .filter(Boolean).length;

  const rightValues = localesData.allFileNames
    .map((fileName) => localesData.getKeyInFile(fileName, rightKey))
    .filter(Boolean).length;

  return leftValue - rightValues;
})
.filter((localeKey) => {
  if (!hideCompleted) {
    return true;
  }

  return localesData.allFileNames.some(
    (fileName) => !localesData.getKeyInFile(fileName, localeKey)
  );
})
*/
