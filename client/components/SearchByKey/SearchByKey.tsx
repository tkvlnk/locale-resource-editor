import React from 'react';
import { useRecoilState } from 'recoil';

import { useGlobalStates } from '../../hooks/useGlobalStates';

export function SearchByKey() {
  const [searchKeyQuery, setSearchKeyQuery] = useRecoilState(
    useGlobalStates().searchKeyQuery
  );

  return (
    <input
      placeholder="Search by key"
      type="text"
      value={searchKeyQuery}
      onChange={({ target: { value } }) => setSearchKeyQuery(value)}
    />
  );
}
