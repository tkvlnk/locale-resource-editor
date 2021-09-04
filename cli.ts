#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';

import yargs from 'yargs/yargs';

import { Params, startServer } from './server/startServer';

(async () => {
  const { argv } = yargs(hideBin(process.argv))
    .option('port', {
      alias: 'p',
      type: 'number',
      description: 'Port to run editor',
      default: 3000
    })
    .options('sourceDir', {
      alias: 's',
      type: 'string',
      description: 'Root folder of locale resources',
      required: true
    })
    .options('filesPrefix', {
      alias: 'f',
      type: 'string',
      description:
        'Prefix of the files name in "sourceDir" directory before locale part. F.e. "messages_" for "messages_en.json", "messages_ru.json"',
      default: 'messages_'
    });

  const params: Params = await Promise.resolve(argv);

  await startServer(params);
})();
