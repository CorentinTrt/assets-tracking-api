import express from 'express';

import roleCheck from './middlewares/role.check';
import requestValidate from './middlewares/request.validate';

import { createAssetSchema } from './schemas/asset.schema';
import { createOrderSchema } from './schemas/order.shema';
import { createTransactionSchema } from './schemas/transaction.schema';

import { deleteUserSessionHandler } from './controllers/session.controller';
import { createAssetHandler } from './controllers/asset.controller';
import { createOrderHandler } from './controllers/order.controller';
import {
  createTransactionHandler,
  getUserTransactionsHandler,
} from './controllers/transaction.controller';

const router = express.Router();

router.get('/check', (req, res) => {
  res.send('Check !');
});

router.delete('/sessions', deleteUserSessionHandler);

router.post(
  '/assets',
  roleCheck(0),
  requestValidate(createAssetSchema),
  createAssetHandler
);

router.post(
  '/orders',
  roleCheck(5),
  requestValidate(createOrderSchema),
  createOrderHandler
);

router.post(
  '/transactions',
  roleCheck(5),
  requestValidate(createTransactionSchema),
  createTransactionHandler
);

router.get('/transactions', roleCheck(5), getUserTransactionsHandler);

export default router;
