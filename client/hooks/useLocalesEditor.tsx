import constate from 'constate';
import React, { useState } from 'react';

import {
  KeysByFileName,
  LocaleEditorService
} from '../services/LocaleEditorService';

import { useLoadSources } from './useLoadSources';
import { useSaveSources } from './useSaveSources';

const [RawProvider, useLocalesEditor] = constate(
  ({
    sourceFiles,
    load,
    save
  }: {
    sourceFiles: KeysByFileName;
    load: () => Promise<KeysByFileName>;
    save: (data: KeysByFileName) => Promise<void>;
  }) => {
    const [data, setData] = useState(sourceFiles);

    return new LocaleEditorService(data, setData, load, save);
  }
);

const LocalesEditorProvider: React.FC = ({ children }) => {
  const { data, isLoading, refetch } = useLoadSources();

  const { mutateAsync } = useSaveSources();

  if (isLoading || !data) {
    return <div />;
  }

  return (
    <RawProvider
      sourceFiles={data}
      load={() => refetch().then((r) => r.data!)}
      save={mutateAsync}
    >
      {children}
    </RawProvider>
  );
};

export { useLocalesEditor, LocalesEditorProvider };
