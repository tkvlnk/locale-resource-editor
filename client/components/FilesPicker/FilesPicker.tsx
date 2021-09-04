import flatten from 'flat';
import React, { FormEvent } from 'react';

import { useLocalesEditor } from '../../hooks/useLocalesEditor';

export function FilesPicker() {
  const localesData = useLocalesEditor();

  const handleInput = async (e: FormEvent<HTMLInputElement>) => {
    const filesArr = Array.from((e.target as HTMLInputElement).files ?? []);

    const results = await parseFiles(filesArr);

    localesData.setAllData(results);
  };

  return <input type="file" multiple onInput={handleInput} />;
}

async function parseFiles(files: File[]) {
  const promises = files.map(
    async (file): Promise<[string, Record<string, string>]> => {
      const text = await file.text();

      try {
        return [file.name, flatten(JSON.parse(text))];
      } catch {
        return [file.name, {}];
      }
    }
  );

  return Object.fromEntries(await Promise.all(promises));
}
