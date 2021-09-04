import constate from 'constate';
import React from 'react';
import { RecoilRoot, atom } from 'recoil';

const KEYS = {
  HIDE_COMPLETED: 'KEYS.HIDE_COMPLETED',
  NESTED_STRUCTURE: 'KEYS.NESTED_STRUCTURE'
} as const;

const [RawProvider, useGlobalStates] = constate(() => ({
  hideCompleted: atom({
    key: KEYS.HIDE_COMPLETED,
    default: localStorage.getItem(KEYS.HIDE_COMPLETED) === 'true',
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((newValue) =>
          localStorage.setItem(KEYS.HIDE_COMPLETED, newValue.toString())
        );
      }
    ]
  }),
  nestedStructure: atom({
    key: KEYS.NESTED_STRUCTURE,
    default: localStorage.getItem(KEYS.NESTED_STRUCTURE) === 'true',
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((newValue) =>
          localStorage.setItem(KEYS.NESTED_STRUCTURE, newValue.toString())
        );
      }
    ]
  })
}));

const GlobalStatesProvider: React.FC = ({ children }) => (
  <RecoilRoot>
    <RawProvider>{children}</RawProvider>
  </RecoilRoot>
);

export { useGlobalStates, GlobalStatesProvider };
