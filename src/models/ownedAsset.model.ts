import mongoose from 'mongoose';

import { UserDocument } from './user.model';
import { AssetDocument } from './asset.model';
import { ExchangeDocument } from './exchange.model';

export interface OwnedAssetDocument extends mongoose.Document {
  user: UserDocument['_id'];
  asset: AssetDocument['_id'];
  asset_symbol: string;
  exchange: ExchangeDocument['_id'];
  amount: number;
}

const ownedAssetSchema = new mongoose.Schema(
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
    asset_symbol: {
      type: String,
      required: true,
    },
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exchanges',
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const OwnedAssetModel = mongoose.model('owned_assets', ownedAssetSchema);

export default OwnedAssetModel;
