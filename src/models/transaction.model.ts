import mongoose from 'mongoose';

import { UserDocument } from './user.model';

import { AssetDocument } from './asset.model';
import { ExchangeDocument } from './exchange.model';

export interface TransactionDocument extends mongoose.Document {
  user: UserDocument['_id'];
  asset: AssetDocument['_id'];
  exhange: ExchangeDocument['_id'];
  type: number;
  amount: number;
  date: Date;
}

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'assets',
      required: true,
    },
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exchanges',
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('transactions', transactionSchema);

export default TransactionModel;
