import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { LocalesEditorProvider } from '../../hooks/useLocalesEditor';

import { KeysList } from '../KeysList/KeysList';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalesEditorProvider>
        <div>
          <p>Locale Resource Editor</p>

          {/* <FilesPicker /> */}
        </div>

        <div>{/* <ExportSection /> */}</div>

        <div>
          <KeysList />
        </div>
      </LocalesEditorProvider>
    </QueryClientProvider>
  );
};
