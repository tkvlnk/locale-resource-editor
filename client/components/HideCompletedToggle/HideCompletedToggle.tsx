import React from 'react';

import { useRecoilState } from 'recoil';

import { useGlobalStates } from '../../hooks/useGlobalStates';

import s from './HideCompletedToggle.module.scss';

export const HideCompletedToggle = () => {
  const [hideCompleted, setHideCompleted] = useRecoilState(
    useGlobalStates().hideCompleted
  );

  return (
    <label className={s.root}>
      <input
        type="checkbox"
        checked={hideCompleted}
        onChange={(event) => setHideCompleted(event.target.checked)}
      />
      <span>Hide completed</span>
    </label>
  );
};
