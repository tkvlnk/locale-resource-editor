import bodyParser from 'body-parser';
import express from 'express';
import webpack from 'webpack';

import middleware from 'webpack-dev-middleware';

import { webpackConfig } from '../webpack.config';

import { createFileWriter } from './createFileWriter';
import { createFilesReader } from './createFilesReader';

export interface Params {
  port: number;
  sourceDir: string;
  filesPrefix: string;
}

export function startServer(params: Params): Promise<void> {
  const { port, sourceDir, filesPrefix } = params;

  const fireReader = createFilesReader({ filesPrefix, sourceDir });
  const filesWriter = createFileWriter({ sourceDir });

  const app = express();

  app.get('/sources', async (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await fireReader()));
  });

  app.post('/sources', bodyParser.json(), async (req, res) => {
    await filesWriter(req.body);
    res.end();
  });

  const compiler = webpack(webpackConfig);

  app.use(middleware(compiler));

  return new Promise((resolve) => {
    app.listen(port, () => {
      console.log(`🌍 Locale Resources Editor started!`); // eslint-disable-line no-console
      console.log(`http://localhost:${port}`); // eslint-disable-line no-console
      resolve();
    });
  });
}
