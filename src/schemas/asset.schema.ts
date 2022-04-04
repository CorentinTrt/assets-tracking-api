import { object, string } from 'zod';

import isISODate from '../utils/formatValidators/isISODate';
import isNumber from '../utils/formatValidators/isNumber';

import { getAssetMessage } from '../utils/errors.messages';

export const createAssetSchema = object({
  body: object({
    name: string({
      required_error: getAssetMessage(1)?.message,
    }),
    symbol: string({
      required_error: getAssetMessage(2)?.message,
    })
      .min(3, getAssetMessage(3)?.message)
      .max(4, getAssetMessage(4)?.message),
    id_cw: string({ required_error: getAssetMessage(6)?.message }).refine(
      isNumber,
      getAssetMessage(6)?.message
    ),
    genesis_date: string({
      required_error: getAssetMessage(5)?.message,
    }).refine(isISODate, getAssetMessage(5)?.message),
  }),
});
