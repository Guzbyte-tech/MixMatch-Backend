import express, { Router } from 'express';
import {
  verifyAccount,
  resendVerificationCode,
  signup,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller';

import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

const verificationRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const passwordResetRateLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3, // 3 requests per hour
});

const authRouter = (router: express.Router) => {
  router.post('/auth/verify-account', verificationRateLimiter, verifyAccount);
  router.post('/auth/resend-verification', resendVerificationCode);
  router.post('/auth/signup', signup);
  router.post('/auth/forgot-password', passwordResetRateLimiter, forgotPassword);
  router.post('/auth/reset-password', passwordResetRateLimiter, resetPassword);
};

export default authRouter;
