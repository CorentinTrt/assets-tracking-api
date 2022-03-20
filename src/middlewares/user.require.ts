import { NextFunction, Request, Response } from 'express';

import { errorResponse } from '../utils/responses';
import { getGlobalMessages } from '../utils/errors.messages';

export default function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;
  // console.log("_____USER", user);

  if (!user) {
    // _response
    return res.status(403).send(errorResponse(403, [getGlobalMessages(1)]));
  }

  return next();
}
