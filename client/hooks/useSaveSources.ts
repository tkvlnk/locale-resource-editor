import { UseMutationResult, useMutation } from 'react-query';

import { KeysByFileName } from '../services/LocaleEditorService';

export function useSaveSources(): UseMutationResult<
  void,
  unknown,
  KeysByFileName
> {
  return useMutation(
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
}
