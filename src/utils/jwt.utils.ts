import config from "config";

import jwt from "jsonwebtoken";

const privateKey = config.get<string>("private_key");
const publicKey = config.get<string>("public_key");

export function signJWT(
  jwtPayload: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(jwtPayload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message == "jwt expired",
      decoded: null,
    };
  }
}
