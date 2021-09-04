import { startServer } from './server/startServer';

void startServer({
  filesPrefix: 'messages_',
  sourceDir: './locale',
  port: 3000
});
