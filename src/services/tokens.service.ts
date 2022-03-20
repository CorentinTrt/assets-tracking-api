import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";

import { signJWT } from "../utils/jwt.utils";

import { UserDocument } from "../models/user.model";
import { SessionDocument } from "../models/session.model";
import TokensModel, { TokensDocument } from "../models/tokens.model";

export async function createTokens(
  user: UserDocument,
  sessionId: SessionDocument["_id"]
) {
  const accessToken = signJWT(
    {
      data: user,
      sessionId: sessionId,
    },
    { expiresIn: config.get("access_token_ttl") }
  );

  const refreshToken = signJWT(
    {
      data: user,
      sessionId: sessionId,
    },
    { expiresIn: config.get("refresh_token_ttl") }
  );

  // DB_call
  return await TokensModel.create({
    user: user.id,
    session: sessionId,
    access_token: accessToken,
    refresh_token: refreshToken,
    are_valid: true,
  });
}

// export async function findTokens(query: FilterQuery<TokensDocument>) {
//   // DB_call
//   return TokensModel.find(query).lean();
// }

export async function findTokens(query: FilterQuery<TokensDocument>) {
  // DB_call
  return TokensModel.findOne(query).lean();
}

export async function updateTokens(
  query: FilterQuery<TokensDocument>,
  update: UpdateQuery<TokensDocument>
) {
  // DB_call
  return TokensModel.updateOne(query, update);
}
