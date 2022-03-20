import { Request, Response } from 'express';
import config from 'config';

import { errorResponse, successResponse } from '../utils/responses';

import { validatePassword } from '../services/user.service';
import {
  createSession,
  findSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import {
  createTokens,
  findTokens,
  updateTokens,
} from '../services/tokens.service';

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user.result) {
    // _response POST session
    return res.status(401).send(errorResponse(401, [user.error]));
  }

  const userAgent = req.get('user-agent') || config.get<string>('env');

  const openSession = await findSession({
    user: user.data._id,
    user_agent: userAgent,
    is_valid: true,
    is_deleted: false,
  });

  // console.log('_____OPEN', openSession);

  let sessionId;
  let tokens;
  if (!openSession) {
    const newSession = await createSession(user.data._id, userAgent);
    sessionId = newSession._id;
    tokens = await createTokens(user.data, sessionId);

    // _response POST sessions
    return res.status(201).send(successResponse(201, tokens));
  } else {
    sessionId = openSession._id;
    tokens = await findTokens({
      user: user.data._id,
      sessions: sessionId,
      are_valid: true,
    });
  }

  // _response POST sessions
  return res.status(200).send(successResponse(200, tokens));
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  //   console.log({ _LOCAL_USER: res.locals.user });
  const userId = res.locals.user._doc
    ? res.locals.user._doc._id
    : res.locals.user._id;

  const sessions = await findSessions({ user: userId, is_valid: true });

  // _response GET sessions
  return res.status(200).send(successResponse(200, sessions));
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const { sessionId } = res.locals.user;
  // console.log("___SESSION-ID", sessionId);

  if (!sessionId)
    return res
      .status(400)
      .send(
        errorResponse(400, [
          { type: 'ressource', message: 'There is no open session' },
        ])
      );

  await Promise.all([
    updateSession({ _id: sessionId }, { is_valid: false }),
    updateTokens({ session: sessionId }, { are_valid: false }),
  ]);

  // _response DELETE session
  return res.status(200).send(
    successResponse(200, {
      message: `Your session : ${sessionId} has been closed`,
    })
  );
}
