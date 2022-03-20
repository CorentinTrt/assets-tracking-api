import mongoose from 'mongoose';
import config from 'config';

import scrypt from 'scrypt-js';
import uid2 from 'uid2';
import { Buffer } from 'buffer';

import ScryptTuning from '../intefaces/scrypt.inteface';

export interface UserDocument extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  salt: Uint8Array;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(
    candidatePassword: string,
    salt: Uint8Array
  ): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String },
    role: { type: Number, required: true, default: 2 },
    is_valid: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const { N, p, r, dkLen } = config.get<ScryptTuning>('scrypt_tuning');

  const salt = Buffer.from(uid2(12));
  const password = Buffer.from(user.password);

  const hash = await scrypt.syncScrypt(password, salt, N, r, p, dkLen);

  user.password = hash.toString();
  user.salt = salt;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as UserDocument;

  const { N, p, r, dkLen } = config.get<ScryptTuning>('scrypt_tuning');

  const salt = Buffer.from(user.salt);
  const password = Buffer.from(candidatePassword);

  const candidateHash = await scrypt.syncScrypt(password, salt, N, r, p, dkLen);

  return user.password === candidateHash.toString() ? true : false;
};

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
