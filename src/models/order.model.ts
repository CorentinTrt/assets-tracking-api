import mongoose from 'mongoose';

import { UserDocument } from './user.model';
import { AssetDocument } from './asset.model';
import { ExchangeDocument } from './exchange.model';

export interface OrderDocument extends mongoose.Document {
  user: UserDocument['_id'];
  asset_bought: AssetDocument['_id'];
  asset_sold: AssetDocument['_id'];
  exchange: ExchangeDocument['_id'];
  is_draft: Boolean;
  amount: number;
  atm_price: number;
  date: Date;
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    asset_bought: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'assets',
      required: true,
    },
    asset_sold: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'assets',
      required: true,
    },
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exchanges',
      required: true,
    },
    is_draft: { type: Boolean, default: false },
    amount: { type: Number, required: true },
    atm_price: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('orders', orderSchema);

export default OrderModel;
