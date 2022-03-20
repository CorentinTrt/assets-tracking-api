import mongoose from 'mongoose';

import { UserDocument } from './user.model';
import { SessionDocument } from './session.model';

export interface TokensDocument extends mongoose.Document {
  user: UserDocument['_id'];
  session: SessionDocument['_id'];
  access_token: string;
  refresh_token: string;
  are_valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'sessions' },
    are_valid: { type: Boolean },
    access_token: { type: String },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

const TokensModel = mongoose.model('tokens', tokenSchema);

export default TokensModel;
