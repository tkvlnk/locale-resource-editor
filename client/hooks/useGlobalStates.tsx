import constate from 'constate';
import React from 'react';
import { AtomEffect, RecoilRoot, atom } from 'recoil';

const KEYS = {
  HIDE_COMPLETED: 'KEYS.HIDE_COMPLETED',
  NESTED_STRUCTURE: 'KEYS.NESTED_STRUCTURE',
  SEARCH_KEY_QUERY: 'SEARCH_KEY_QUERY'
} as const;

const preserveInLocalStorage: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ onSet }) => {
    onSet((newValue) => localStorage.setItem(key, String(newValue)));
  };

const [RawProvider, useGlobalStates] = constate(() => ({
  hideCompleted: atom({
    key: KEYS.HIDE_COMPLETED,
    default: localStorage.getItem(KEYS.HIDE_COMPLETED) === 'true',
    effects_UNSTABLE: [preserveInLocalStorage(KEYS.HIDE_COMPLETED)]
  }),
  nestedStructure: atom({
    key: KEYS.NESTED_STRUCTURE,
    default: localStorage.getItem(KEYS.NESTED_STRUCTURE) === 'true',
    effects_UNSTABLE: [preserveInLocalStorage(KEYS.NESTED_STRUCTURE)]
  }),
  searchKeyQuery: atom({
    key: KEYS.SEARCH_KEY_QUERY,
    default: ''
  })
}));

const GlobalStatesProvider: React.FC = ({ children }) => (
  <RecoilRoot>
    <RawProvider>{children}</RawProvider>
  </RecoilRoot>
);

export { useGlobalStates, GlobalStatesProvider };
