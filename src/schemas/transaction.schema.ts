import { object, string } from 'zod';

import isISODate from '../utils/formatValidators/isISODate';
import isNumber from '../utils/formatValidators/isNumber';
import { getTransactionMessages } from '../utils/errors.messages';

export const createTransactionSchema = object({
  body: object({
    asset: string({
      required_error: getTransactionMessages(1)?.message,
    })
      .min(3, getTransactionMessages(2)?.message)
      .max(4, getTransactionMessages(3)?.message),
    exchange: string({
      required_error: getTransactionMessages(4)?.message,
    }),
    type: string({
      required_error: getTransactionMessages(7)?.message,
    }).refine(isNumber, getTransactionMessages(7)?.message),
    amount: string({
      required_error: getTransactionMessages(5)?.message,
    }).refine(isNumber, getTransactionMessages(5)?.message),
    date: string({
      required_error: getTransactionMessages(8)?.message,
    }).refine(isISODate, getTransactionMessages(8)?.message),
  }),
});
