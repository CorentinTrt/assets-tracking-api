import config from 'config';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';

import { signJWT, verifyJWT } from '../utils/jwt.utils';

import SessionModel, { SessionDocument } from '../models/session.model';
import { findUser } from './user.service';

// import UserLocation from "../intefaces/user.location.interface";

export async function createSession(
  userId: string,
  userAgent: string
  //   userLocation: UserLocation
) {
  // DB_call
  const session = await SessionModel.create({
    user: userId,
    user_agent: userAgent,
    // userLocation,
  });

  return session.toJSON();
}

export async function findSession(query: FilterQuery<SessionDocument>) {
  // DB_call
  return SessionModel.findOne(query).lean();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  // DB_call
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  // DB_call
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJWT(refreshToken);
  // console.log('_____DECODED', decoded);

  if (!decoded || !get(decoded, 'sessionId')) return false;

  // DB_call
  const session = await SessionModel.findById(get(decoded, 'sessionId'));
  // console.log('_____SESSION', session);

  if (!session || !session.is_valid) return false;

  // DB_call
  const user = await findUser({ _id: session.user, is_valid: true });

  if (!user) return false;

  const accessToken = signJWT(
    {
      data: user,
      sessionId: session._id,
    },
    { expiresIn: config.get('access_token_ttl') }
  );

  return accessToken;
}
