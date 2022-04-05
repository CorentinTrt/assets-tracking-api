import { Request, Response } from 'express';

import { successResponse, errorResponse } from '../utils/responses';
import { getTransactionMessages } from '../utils/errors.messages';

import { createExchange, findExchanges } from '../services/exchange.service';
import {
  createOwnedAsset,
  findAndPopulateOwnedAsset,
  updateOwnedAsset,
} from '../services/ownedAsset.service';
import { findAsset } from '../services/asset.service';
import {
  createTransaction,
  findAndPopulateTransactions,
} from '../services/transaction.service';

import { UserDocument } from '../models/user.model';
import { execArgv } from 'process';

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

  const _exchanges = await findExchanges({ name: exchange.toLowerCase() });

  if (_exchanges.length === 0)
    // _response POST transaction
    return res
      .status(400)
      .send(
        errorResponse(400, [
          { type: 'asset', message: getTransactionMessages(9)?.message },
        ])
      );

  const getOwnedAssetBought = await findAndPopulateOwnedAsset(
    { user, asset_symbol: assetSymbol, exchange: _exchanges[0]._id },
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
          exchange: _exchanges[0]._id,
          amount,
        })
      : await updateOwnedAsset(
          { user, asset_symbol: assetSymbol, exchange: _exchanges[0]._id },
          { $inc: { amount: _type === 0 ? +amount : -amount } }
        );
  };

  const _updatedOwnedAssetBought = await getUpdatedOwnedAssetBought();

  const input = {
    user,
    asset: _updatedOwnedAssetBought._id,
    type,
    exchange: _exchanges[0]._id,
    amount,
    date,
  };

  try {
    // @ts-ignore
    const transaction = await createTransaction(input);

    // _response POST transaction
    return res.status(201).send(successResponse(201, transaction));
  } catch (error: any) {
    // _response POST transaction
    return res
      .status(409)
      .send(errorResponse(409, [{ type: 'db', message: error.message }]));
  }
}

export async function getUserTransactionsHandler(req: Request, res: Response) {
  const { _id: user }: { _id: UserDocument['_id'] } = res.locals.user.data;

  // use "+" to split the exchanges in the query
  const { exchanges: _exchanges } = req.query;

  //   @ts-ignore
  const exchangeNames = _exchanges?.split(' ');
  for (let i = 0; i < exchangeNames.length; i++) {
    exchangeNames[i] = exchangeNames[i].trim();
    exchangeNames[i] = exchangeNames[i].toLowerCase();
  }

  const exchange = await findExchanges({ name: exchangeNames });

  const transactions = await findAndPopulateTransactions({ user, exchange }, [
    'asset',
  ]);

  // _response DELETE session
  return res.status(200).send(successResponse(200, transactions));
}
