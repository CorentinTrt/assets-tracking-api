import { Request, Response } from 'express';

import { successResponse, errorResponse } from '../utils/responses';
import { getTransactionMessages } from '../utils/errors.messages';

import { findExchange } from '../services/exchange.service';
import {
  findAndPopulateOwnedAsset,
  updateOwnedAsset,
} from '../services/ownedAsset.service';
import { findAsset } from '../services/asset.service';
import { createTransaction } from '../services/transaction.service';

import { UserDocument } from '../models/user.model';

export async function createTransactionHandler(req: Request, res: Response) {
  const { _id: user }: { _id: UserDocument['_id'] } = res.locals.user.data;
  const {
    asset: assetSymbol,
    exchange,
    type,
    amount,
    date,
  }: {
    asset: string;
    exchange: string;
    type: string;
    amount: number;
    date: Date;
  } = req.body;

  const _exchange = await findExchange({ name: exchange.toLowerCase() });

  if (!_exchange)
    return res
      .status(400)
      .send(
        errorResponse(400, [
          { type: 'asset', message: getTransactionMessages(9)?.message },
        ])
      );

  const getOwnedAssetBought = findAndPopulateOwnedAsset(
    { user, asset_symbol: assetSymbol, exchange: _exchange._id },
    ['asset']
  );

  const _assetBought = !getOwnedAssetBought
    ? await findAsset({ symbol: assetSymbol })
    : null;

  const _type = Number(type);

  const getUpdatedOwnedAssetBought = async () => {
    return _assetBought
      ? // @ts-ignore
        await createOwnedAsset({
          user,
          asset: _assetBought._id,
          asset_symbol: assetSymbol,
          exchange: _exchange._id,
          amount,
        })
      : await updateOwnedAsset(
          { user, asset_symbol: assetSymbol, exchange: _exchange._id },
          { $inc: { amount: _type === 0 ? +amount : -amount } }
        );
  };

  const _updatedOwnedAssetBought = await getUpdatedOwnedAssetBought();

  const input = {
    user,
    asset: _updatedOwnedAssetBought._id,
    type,
    exchange: _exchange._id,
    amount,
    date,
  };

  try {
    // @ts-ignore
    const transaction = await createTransaction(input);

    return res.status(201).send(successResponse(201, transaction));
  } catch (error: any) {
    return res
      .status(409)
      .send(errorResponse(409, [{ type: 'db', message: error.message }]));
  }
}

export async function getUserTransactionHandler(req: Request, res: Response) {}
