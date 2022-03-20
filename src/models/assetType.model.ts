import mongoose from 'mongoose';

export interface AssetTypeDocument extends mongoose.Document {
  label: string;
}

const assetSchema = new mongoose.Schema(
  {
    label: { type: String, unique: true },
  },
  { timestamps: true }
);

const AssetTypeModel = mongoose.model('asset_types', assetSchema);

export default AssetTypeModel;
