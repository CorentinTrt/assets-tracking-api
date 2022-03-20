import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

import { verifyJWT } from '../utils/jwt.utils';

import { reIssueAccessToken } from '../services/session.service';
import { findTokens, updateTokens } from '../services/tokens.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  const refreshToken = get(req, 'headers.x-refresh');
  // console.log('___ACCESS-TOKEN', accessToken);
  // console.log('___REFRESH-TOKEN', refreshToken);

  const areValid = await findTokens({
    refresh_token: refreshToken,
    are_valid: true,
  });
  // console.log('_ARE-VALID', areValid);

  if (!accessToken || !areValid) return next();

  const { decoded, expired } = verifyJWT(accessToken);
  // console.log({ _DECODED: decoded, _EXPIRED: expired });

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    // console.log({ _newAccessToken: newAccessToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      await updateTokens(
        { refresh_token: refreshToken },
        { access_token: newAccessToken }
      );

      const result = verifyJWT(newAccessToken);
      // console.log({ _RESULT: result });

      res.locals.user = result.decoded;

      return next();
    }
  }
  return next();
};

export default deserializeUser;
