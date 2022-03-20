import { FilterQuery } from 'mongoose';

import AssetModel, { AssetDocument } from './../models/asset.model';

export async function createAsset(input: AssetDocument) {
  try {
    return await AssetModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAsset(query: FilterQuery<AssetDocument>) {
  // DB_call
  // const asset
  return (await AssetModel.find(query).lean()).length === 1
    ? (await AssetModel.find(query).lean())[0]
    : await AssetModel.find(query).lean();
}
