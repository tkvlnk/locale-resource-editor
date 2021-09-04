import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStatesProvider } from '../../hooks/useGlobalStates';
import { LocalesEditorProvider } from '../../hooks/useLocalesEditor';

import { HideCompletedToggle } from '../HideCompletedToggle/HideCompletedToggle';
import { KeysList } from '../KeysList/KeysList';
import { SaveBtn } from '../SaveBtn/SaveBtn';

import s from './App.module.scss';

const queryClient = new QueryClient();
export const App = () => {
  const [projectName] = useState(() =>
    document.title.replace('Locale Resource Editor - ', '')
  );

  return (
    <GlobalStatesProvider>
      <QueryClientProvider client={queryClient}>
        <LocalesEditorProvider>
          <div className={s.root}>
            <header className={s.header}>
              <h1>
                <div>Locale Resource Editor</div>
                <div>
                  <sub>{projectName}</sub>
                </div>
              </h1>

              <SaveBtn />

              <HideCompletedToggle />
            </header>

            <KeysList />
          </div>
        </LocalesEditorProvider>
      </QueryClientProvider>
    </GlobalStatesProvider>
  );
};
