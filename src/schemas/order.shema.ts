import { number, object, string } from 'zod';

import isISODate from '../utils/formatValidators/isISODate';
import isNumber from '../utils/formatValidators/isNumber';

import { getOrderMessages } from '../utils/errors.messages';

export const createOrderSchema = object({
  body: object({
    asset_bought: string({
      required_error: getOrderMessages(1)?.message,
    })
      .min(3, getOrderMessages(3)?.message)
      .max(4, getOrderMessages(4)?.message),
    asset_sold: string({
      required_error: getOrderMessages(1)?.message,
    })
      .min(3, getOrderMessages(3)?.message)
      .max(4, getOrderMessages(4)?.message),
    exchange: string({
      required_error: getOrderMessages(5)?.message,
    }),
    amount: string({ required_error: getOrderMessages(7)?.message }).refine(
      isNumber,
      getOrderMessages(7)?.message
    ),
    atm_price: string({ required_error: getOrderMessages(8)?.message }).refine(
      isNumber,
      getOrderMessages(8)?.message
    ),
    date: string({
      required_error: getOrderMessages(9)?.message,
    }).refine(isISODate, getOrderMessages(9)?.message),
  }),
});
