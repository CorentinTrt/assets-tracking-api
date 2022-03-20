import mongoose from 'mongoose';

import { AssetTypeDocument } from './assetType.model';

export interface ExchangeDocument extends mongoose.Document {
  name: string;
  asset_type: Array<AssetTypeDocument['_id']>;
}

const exchangeSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    asset_types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'asset_types' }],
  },
  { timestamps: true }
);

const ExchangeModel = mongoose.model('exchanges', exchangeSchema);

export default ExchangeModel;
