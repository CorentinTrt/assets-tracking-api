import { FilterQuery } from 'mongoose';

import ExchangeModel, { ExchangeDocument } from '../models/exchange.model';

export async function createExchange(input: ExchangeDocument) {
  try {
    return await ExchangeModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findExchanges(query: FilterQuery<ExchangeDocument>) {
  return await ExchangeModel.find(query).lean();
}
