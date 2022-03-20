import mongoose from 'mongoose';

export interface AssetDocument extends mongoose.Document {
  name: string;
  symbol: string;
  id_cw: string;
  genesis_date: Date;
}

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    symbol: { type: String, unique: true, required: true },
    id_cw: { type: String, unique: true, required: true },
    genesis_date: { type: Date },
  },
  { timestamps: true }
);

const AssetModel = mongoose.model('assets', assetSchema);

export default AssetModel;
