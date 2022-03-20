import mongoose from 'mongoose';

import { UserDocument } from './user.model';
// import UserLocation from "../intefaces/user.location.interface";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument['_id'];
  is_valid: Boolean;
  user_agent: string;
  //   user_location: UserLocation;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    is_valid: { type: Boolean, default: true },
    user_agent: { type: String },
    // user_location: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model('Sessions', sessionSchema);

export default SessionModel;
