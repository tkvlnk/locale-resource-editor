import constate from 'constate';
import { flatten } from 'flat';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import {
  KeysByFileName,
  LocaleEditorService
} from '../services/LocaleEditorService';

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
  const { data, isLoading, refetch } = useQuery(
    'source-files',
    async (): Promise<KeysByFileName> => {
      const fromServer = await fetch('/sources').then((r) => r.json());
      return Object.fromEntries(
        Object.entries(fromServer).map(([key, value]) => [key, flatten(value)])
      );
    }
  );

  const { mutateAsync } = useMutation(
    'update-source-files',
    async (nextData: KeysByFileName) => {
      await fetch('/sources', {
        method: 'post',
        body: JSON.stringify(nextData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  );

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
