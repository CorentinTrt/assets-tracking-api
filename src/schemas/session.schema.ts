import { object, string } from 'zod';

import {
  getUsernameMessages,
  getPasswordMessages,
} from '../utils/errors.messages';

export const createSessionSchema = object({
  body: object({
    username: string({
      required_error: getUsernameMessages(4)?.message,
    }).min(6, getUsernameMessages(1)?.message),
    password: string({
      required_error: getPasswordMessages(4)?.message,
    })
      .min(8, getPasswordMessages(1)?.message)
      .regex(new RegExp('.*[A-Z].*'), getPasswordMessages(8)?.message)
      .regex(new RegExp('.*[a-z].*'), getPasswordMessages(7)?.message)
      .regex(new RegExp('.*\\d.*'), getPasswordMessages(9)?.message)
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        getPasswordMessages(10)?.message
      ),
  }),
});
