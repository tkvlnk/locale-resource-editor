import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStatesProvider } from '../../hooks/useGlobalStates';
import { LocalesEditorProvider } from '../../hooks/useLocalesEditor';

import { HideCompletedToggle } from '../HideCompletedToggle/HideCompletedToggle';
import { KeysList } from '../KeysList/KeysList';
import { SaveBtn } from '../SaveBtn/SaveBtn';

import { SearchByKey } from '../SearchByKey/SearchByKey';

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
              <h1>Locale Resource Editor: {projectName}</h1>

              <div className={s.save}>
                <SaveBtn />
              </div>

              <div className={s.search}>
                <SearchByKey />
                <HideCompletedToggle />
              </div>
            </header>

            <KeysList />
          </div>
        </LocalesEditorProvider>
      </QueryClientProvider>
    </GlobalStatesProvider>
  );
};
