import { object, string, TypeOf } from 'zod';

import {
  getEmailMessages,
  getUsernameMessages,
  getPasswordMessages,
} from '../utils/errors.messages';

export const createUserSchema = object({
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
    passwordConfirmation: string({
      required_error: getPasswordMessages(6)?.message,
    }),
    email: string({
      required_error: getEmailMessages(4)?.message,
    }).email(getEmailMessages(1)?.message),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: getPasswordMessages(5)?.message,
    path: ['password'],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
