import fs from 'fs';
import path from 'path';
import util from 'util';

import type { Params } from './startServer';

const writeFile = util.promisify(fs.writeFile);

export function createFileWriter({
  sourceDir
}: Pick<Params, 'sourceDir'>): (
  filesMap: Record<string, unknown>
) => Promise<void> {
  return async (filesMap) => {
    const promise = Object.entries(filesMap).map(([name, content]) =>
      writeFile(
        path.join(sourceDir, name),
        `${JSON.stringify(content, null, 2)}\n`
      )
    );

    await Promise.all(promise);
  };
}
