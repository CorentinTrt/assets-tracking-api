import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

import { errorResponse } from '../utils/responses';
import errorZodReformate from '../utils/error.zod.reformate';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log('BODY', req.body);

    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const errorsResponse = error?.issues.map((issue: AnyZodObject) => {
        console.log(issue);

        return errorZodReformate(issue);
      });

      // _response ALL request
      return res.status(400).send(errorResponse(400, errorsResponse));
    }
  };

export default validate;
