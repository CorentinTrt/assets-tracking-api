import * as dotenv from 'dotenv';

dotenv.config();

const _env = process.env;

export default {
  port: _env.PORT_DEV,
  domain: _env.DOMAIN_DEV,
  env: _env.NODE_ENV,
  // db
  db_uri: `mongodb+srv://${_env.DB_USER}:${_env.DB_PASSWORD}@crypto-tracking.${_env.CLUSTER_ID}.mongodb.net/${_env.NODE_ENV}?retryWrites=true&w=majority`,
  // security
  scrypt_tuning: {
    N: 1024,
    r: 8,
    p: 1,
    dkLen: 32,
  },
  access_token_ttl: _env.ACCES_TOKEN_TTL,
  refresh_token_ttl: _env.REFRESH_TOKEN_TTL,
  public_key: _env.PUBLIC_KEY?.replace(/\\n/g, '\n'),
  private_key: _env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  // tests
  test_user_username: _env.TEST_USER_USERNAME,
  test_user_pswd: _env.TEST_USER_PSWD,
};
