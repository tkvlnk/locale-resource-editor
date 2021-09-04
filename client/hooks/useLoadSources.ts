import { flatten } from 'flat';
import { UseQueryResult, useQuery } from 'react-query';

import { KeysByFileName } from '../services/LocaleEditorService';

export function useLoadSources(): UseQueryResult<KeysByFileName> {
  return useQuery(
    'source-files',
    async () => {
      const fromServer = (await fetch('/sources').then((r) =>
        r.json()
      )) as KeysByFileName;

      return Object.fromEntries(
        Object.entries(fromServer).map(([key, value]) => [key, flatten(value)])
      );
    },
    {
      staleTime: Infinity
    }
  );
}
