import config from 'config';

import createServer from './utils/server';
import connect from './utils/db.connect';
import log from './utils/logger';

import swaggerDocs from './swagger/setup';

const PORT = config.get<number>('port');

const app = createServer();

app.listen(PORT, () => {
  log.info(`API is running on port: ${PORT}`);

  try {
    connect();
  } catch (error) {
    log.error(error);
  }

  swaggerDocs(app, PORT);
});
