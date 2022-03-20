import { Request, Response } from 'express';

import { successResponse, errorResponse } from '../utils/responses';

import { createAsset } from '../services/asset.service';

export async function createAssetHandler(req: Request, res: Response) {
  try {
    const asset = await createAsset(req.body);

    return res.status(201).send(successResponse(201, asset));
  } catch (error: any) {
    return res
      .status(409)
      .send(errorResponse(409, [{ type: 'db', message: error.message }]));
  }
}
