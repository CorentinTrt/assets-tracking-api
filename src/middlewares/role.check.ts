import { NextFunction, Request, Response } from 'express';

import { errorResponse } from '../utils/responses';
import { getGlobalMessages } from '../utils/errors.messages';

const roleCheck =
  (roleInput: Number) => (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.user.data;
    // console.log('_____ROLE', role);
    // console.log('_____VALID ROLE ?', role <= roleInput);

    return role > roleInput
      ? res.status(403).send(errorResponse(403, [getGlobalMessages(1)]))
      : next();
  };

export default roleCheck;
