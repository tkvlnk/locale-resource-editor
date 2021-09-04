import React, { useState } from 'react';

import { useRecoilState } from 'recoil';

import { useGlobalStates } from '../../hooks/useGlobalStates';
import { useLocalesEditor } from '../../hooks/useLocalesEditor';

import s from './SaveBtn.module.scss';

export function SaveBtn() {
  const localesData = useLocalesEditor();

  const [nestedStructure, setNestedStructure] = useRecoilState(
    useGlobalStates().nestedStructure
  );

  const [pending, setPending] = useState(false);

  return (
    <div className={s.root}>
      <label className={s.checkbox}>
        <input
          type="checkbox"
          checked={nestedStructure}
          onChange={({ target: { checked } }) => setNestedStructure(checked)}
        />
        <span>Nested structure</span>
      </label>{' '}
      <button
        disabled={pending}
        className={s.button}
        type="button"
        onClick={async () => {
          try {
            setPending(true);
            await localesData.uploadData({
              isNestedStructure: nestedStructure
            });
          } finally {
            setPending(false);
          }
        }}
      >
        Save Files
      </button>
    </div>
  );
}
