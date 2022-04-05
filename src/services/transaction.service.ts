import { FilterQuery } from 'mongoose';
import TransactionModel, {
  TransactionDocument,
} from '../models/transaction.model';

export async function createTransaction(input: TransactionDocument) {
  try {
    return await TransactionModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAndPopulateTransactions(
  query: FilterQuery<TransactionDocument>,
  _collections: Array<string>
) {
  const collections = _collections.join(' ');

  return await TransactionModel.find(query).populate(collections);
}
