import { Request, Response } from 'express';
// import log from '../utils/logger';

import { successResponse, errorResponse } from '../utils/responses';
import cleanUser from '../utils/user.cleanReponse';

import { CreateUserInput } from '../schemas/user.schema';

import { createUser } from '../services/user.service';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    // log.info({ _USER: user });

    // _response POST user
    return res.status(201).send(successResponse(201, cleanUser(user)));
  } catch (error: any) {
    // log.error(error);

    // _response POST user
    return res
      .status(409)
      .send(errorResponse(409, [{ type: 'db', message: error.message }]));
  }
}
