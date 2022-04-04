import { Request, Response } from 'express';

import { successResponse, errorResponse } from '../utils/responses';
import { getOrderMessages } from '../utils/errors.messages';

import { findAsset } from '../services/asset.service';
import {
  createOwnedAsset,
  findAndPopulateOwnedAsset,
  updateOwnedAsset,
} from '../services/ownedAsset.service';
import { findExchange } from '../services/exchange.service';
import { createOrder } from '../services/order.service';

import { UserDocument } from '../models/user.model';

export async function createOrderHandler(req: Request, res: Response) {
  const { _id: user }: { _id: UserDocument['_id'] } = res.locals.user.data;
  const {
    is_draft,
    asset_bought: assetBoughtSymbol,
    asset_sold: assetSoldSymbol,
    exchange,
    amount,
    atm_price,
    date,
  }: {
    is_draft: boolean;
    asset_bought: string;
    asset_sold: string;
    exchange: string;
    amount: number;
    atm_price: number;
    date: Date;
  } = req.body;

  const _exchange = await findExchange({ name: exchange.toLowerCase() });

  if (!_exchange)
    return res
      .status(400)
      .send(
        errorResponse(400, [
          { type: 'asset', message: getOrderMessages(11)?.message },
        ])
      );

  const [getOwnedAssetBought, getOwnedAssetSold] = await Promise.all([
    findAndPopulateOwnedAsset(
      { user, asset_symbol: assetBoughtSymbol, exchange: _exchange._id },
      ['asset']
    ),
    findAndPopulateOwnedAsset(
      { user, asset_symbol: assetSoldSymbol, exchange: _exchange._id },
      ['asset']
    ),
  ]);

  if (!getOwnedAssetSold)
    return res
      .status(400)
      .send(
        errorResponse(400, [
          { type: 'asset', message: 'Something went wrong in your request' },
        ])
      );

  const { _id: asset_sold }: { _id: string } = getOwnedAssetSold.asset;

  const isDoable = getOwnedAssetSold.amount - amount >= 0;

  if (!isDoable && !is_draft)
    return res
      .status(400)
      .send(
        errorResponse(400, [
          { type: 'asset', message: getOrderMessages(10)?.message },
        ])
      );

  const _assetBought = !getOwnedAssetBought
    ? await findAsset({ symbol: assetBoughtSymbol })
    : null;

  const getUpdatedOwnedAssetBought = async () => {
    return _assetBought
      ? // @ts-ignore
        await createOwnedAsset({
          user,
          asset: _assetBought._id,
          asset_symbol: assetBoughtSymbol,
          exchange: _exchange._id,
          amount,
        })
      : await updateOwnedAsset(
          { user, asset_symbol: assetBoughtSymbol, exchange: _exchange._id },
          { $inc: { amount: +amount } }
        );
  };

  // update or create asset bought
  const _updatedOwnedAssetBought = await getUpdatedOwnedAssetBought();

  // update asset sold
  await updateOwnedAsset(
    { user, asset_symbol: assetSoldSymbol, exchange: _exchange._id },
    { $inc: { amount: -amount } }
  );

  const input = {
    user,
    is_draft,
    asset_bought: _updatedOwnedAssetBought._id,
    asset_sold,
    exchange: _exchange._id,
    amount,
    atm_price,
    date,
  };

  try {
    // @ts-ignore
    const order = await createOrder(input);

    return res.status(201).send(successResponse(201, order));
  } catch (error: any) {
    return res
      .status(409)
      .send(errorResponse(409, [{ type: 'db', message: error.message }]));
  }
}
