import config from 'config';
import mongoose from 'mongoose';

import {
  getPasswordMessages,
  getUsernameMessages,
} from '../utils/errors.messages';

const sessionInput = {
  username: config.get<string>('test_user_username'),
  password: config.get<string>('test_user_pswd'),
};

const incorrectUsernamePayload = [
  {
    type: 'username',
    message: getUsernameMessages(1)?.message,
  },
];

const incorrectPasswordFormatPayload = [
  {
    type: 'password',
    message: getPasswordMessages(1)?.message,
  },
  {
    type: 'password',
    message: getPasswordMessages(8)?.message,
  },
  {
    type: 'password',
    message: getPasswordMessages(9)?.message,
  },
  {
    type: 'password',
    message: getPasswordMessages(10)?.message,
  },
];

const incorrectPasswordPayload = [
  {
    type: 'password',
    message: getPasswordMessages(3)?.message,
  },
];

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: new mongoose.Types.ObjectId().toString(),
  session: new mongoose.Types.ObjectId().toString(),
  are_valid: true,
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
};

const unauthorizedPayload = {};

export {
  sessionInput,
  incorrectUsernamePayload,
  incorrectPasswordFormatPayload,
  incorrectPasswordPayload,
  sessionPayload,
  unauthorizedPayload,
};
