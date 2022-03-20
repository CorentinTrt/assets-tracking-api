import mongoose from 'mongoose';
import config from 'config';

require('../models/asset.model');
require('../models/assetType.model');
require('../models/exchange.model');
require('../models/order.model');
require('../models/ownedAsset.model');
require('../models/session.model');
require('../models/tokens.model');
require('../models/user.model');

import logger from './logger';

function connect() {
  const URI = config.get<string>('db_uri');

  var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  mongoose.connect(URI, options, error => {
    !error ? logger.info('Connected to database') : logger.error(error);
  });
}

export function disconnect() {
  logger.info('Disconnected from database');
  mongoose.disconnect();
}

export default connect;
