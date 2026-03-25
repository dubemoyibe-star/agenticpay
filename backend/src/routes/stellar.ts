import { Router } from 'express';
import {
  getAccountInfo,
  getTransactionStatus,
  isValidStellarAddress,
  isValidTransactionHash,
} from '../services/stellar.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

export const stellarRouter = Router();

// Get Stellar account info
stellarRouter.get(
  '/account/:address',
  asyncHandler(async (req, res) => {
    const address = Array.isArray(req.params.address) ? req.params.address[0] : req.params.address;

    if (!isValidStellarAddress(address)) {
      throw new AppError(400, 'Invalid Stellar address', 'VALIDATION_ERROR');
    }

    const account = await getAccountInfo(address);
    res.json(account);
  })
);

// Get transaction status
stellarRouter.get(
  '/tx/:hash',
  asyncHandler(async (req, res) => {
    const hash = Array.isArray(req.params.hash) ? req.params.hash[0] : req.params.hash;

    if (!isValidTransactionHash(hash)) {
      throw new AppError(400, 'Invalid transaction hash', 'VALIDATION_ERROR');
    }

    const tx = await getTransactionStatus(hash);
    res.json(tx);
  })
);
