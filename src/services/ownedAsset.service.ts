import { FilterQuery, UpdateQuery } from 'mongoose';

import OwnedAssetModel, {
  OwnedAssetDocument,
} from '../models/ownedAsset.model';

export async function createOwnedAsset(input: OwnedAssetDocument) {
  try {
    return OwnedAssetModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findOwnedAsset(query: FilterQuery<OwnedAssetDocument>) {
  return (await OwnedAssetModel.find(query).lean()).length <= 1
    ? (await OwnedAssetModel.find(query).lean())[0]
    : await OwnedAssetModel.find(query).lean();
}

export async function findAndPopulateOwnedAsset(
  query: FilterQuery<OwnedAssetDocument>,
  _collections: Array<string>
) {
  const collections = _collections.join(' ');

  return await OwnedAssetModel.findOne(query).populate(collections);
}

export async function updateOwnedAsset(
  query: FilterQuery<OwnedAssetDocument>,
  update: UpdateQuery<OwnedAssetDocument>
) {
  try {
    return await OwnedAssetModel.findOneAndUpdate(query, update);
  } catch (error: any) {
    throw new Error(error);
  }
}
