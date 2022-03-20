import express from 'express';

import roleCheck from './middlewares/role.check';
import requestValidate from './middlewares/request.validate';

import { createAssetSchema } from './schemas/asset.schema';
import { createOrderSchema } from './schemas/order.shema';

import { deleteUserSessionHandler } from './controllers/session.controller';
import { createAssetHandler } from './controllers/asset.controller';
import { createOrderHandler } from './controllers/order.controller';

const router = express.Router();

router.get('/check', (req, res) => {
  res.send('Check !');
});

/**
 * @openapi
 * /s/api/sessions :
 *  delete:
 *    tags:
 *      - Sessions
 *    summary: Close user's current session
 *    Authorization: Bearer <token>
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteSessionResponse'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 */
router.delete('/sessions', deleteUserSessionHandler);

/**
 * !! TODO  !!
 * @openapi
 * /s/api/assets :
 *  post:
 *    tags:
 *      - Assets
 *    summary: Create a new asset
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    Authorization: Bearer <token>
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteSessionResponse'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 */
router.post(
  '/assets',
  roleCheck(0),
  // requestValidate(createAssetSchema),
  createAssetHandler
);

router.post(
  '/orders',
  roleCheck(5),
  requestValidate(createOrderSchema),
  createOrderHandler
);

export default router;
