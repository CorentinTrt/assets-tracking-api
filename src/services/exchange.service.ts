import { FilterQuery } from 'mongoose';

import ExchangeModel, { ExchangeDocument } from '../models/exchange.model';

export async function createExchange(input: ExchangeDocument) {
  try {
    return await ExchangeModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findExchange(query: FilterQuery<ExchangeDocument>) {
  // DB_call
  // const asset
  return (await ExchangeModel.find(query).lean()).length === 1
    ? (await ExchangeModel.find(query).lean())[0]
    : await ExchangeModel.find(query).lean();
}
