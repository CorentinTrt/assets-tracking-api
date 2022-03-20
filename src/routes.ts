import express from 'express';
const router = express.Router();

import requestValidate from './middlewares/request.validate';
import requireUser from './middlewares/user.require';

import { createUserHandler } from './controllers/user.controller';
import {
  createSessionHandler,
  getUserSessionsHandler,
} from './controllers/session.controller';

import { createUserSchema } from './schemas/user.schema';
import { createSessionSchema } from './schemas/session.schema';

/**
 * @openapi
 * /api/users :
 *  post:
 *    tags:
 *      - Users
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request - Invalid Input
 *      409:
 *        description: Conflict - Duplicate key (username or email)
 */

router.post('/users', requestValidate(createUserSchema), createUserHandler);

/**
 * @openapi
 * /api/sessions :
 *  post:
 *    tags:
 *      - Sessions
 *    summary: Open a user's session
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
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      400:
 *        description: Bad request - Invalid Input
 *      401:
 *        description: Unauthorized - Credentials not valid
 */
router.post(
  '/sessions',
  requestValidate(createSessionSchema),
  createSessionHandler
);

/**
 * @openapi
 * /api/sessions :
 *  get:
 *    tags:
 *      - Sessions
 *    summary: Get all of the user's sessions
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetSessionsResponse'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 */
router.get('/sessions', requireUser, getUserSessionsHandler);

export default router;
