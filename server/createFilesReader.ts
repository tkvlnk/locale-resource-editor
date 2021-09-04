import fs from 'fs';
import path from 'path';
import util from 'util';

import type { Params } from './startServer';

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

export function createFilesReader(
  params: Pick<Params, 'sourceDir' | 'filesPrefix'>
): () => Promise<Record<string, unknown>> {
  return async () => {
    const { sourceDir, filesPrefix } = params;

    let fileNames = await readDir(path.resolve(sourceDir));
    fileNames = fileNames.filter((name) => name.startsWith(filesPrefix));

    const promises = fileNames.map(async (name) => {
      const content = await readFile(path.join(sourceDir, name), 'utf-8');

      return [name, JSON.parse(content) as unknown];
    });

    const fileEntries = await Promise.all(promises);

    return Object.fromEntries(fileEntries) as Record<string, unknown>;
  };
}
