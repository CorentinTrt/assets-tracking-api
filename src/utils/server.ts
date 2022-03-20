import express from 'express';
import morgan from 'morgan';

import router from '../routes';
import securedRouter from '../routes.secure';

import deserializeUser from '../middlewares/user.deserialize';
import requireUser from '../middlewares/user.require';

import wsConnect from '../utils/test.ws';

export default function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  app.use('/api', router);

  // to secured routes
  app.use(deserializeUser);
  app.use(requireUser);

  app.use('/api.s', securedRouter);

  // wsConnect();

  return app;
}
