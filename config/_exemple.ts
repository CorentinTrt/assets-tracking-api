const _env = process.env;

export default {
  port: 3000,
  domain: '',
  env: _env.NODE_ENV,
  // _db
  db_uri: '',
  // _security
  scrypt_tuning: {
    N: 1024,
    r: 8,
    p: 1,
    dkLen: 32,
  },
  access_token_ttl: '',
  refresh_token_ttl: '',
  public_key: `-----BEGIN PUBLIC KEY-----
  -----END PUBLIC KEY-----`,
  private_key: `-----BEGIN PRIVATE KEY-----
  -----END PRIVATE KEY-----`,
  // _test
  test_user_username: '',
  test_user_pswd: '',
};
