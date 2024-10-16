import express from 'express';
import authRouter from './auth';
import protectedRouter from './protected';
import productRoutes from './product';
import shopRoutes from './shop';
import orderRoutes from './orders';
import passport from 'passport';
import returnRouter from './returnRouter';

const vendor = express.Router();

vendor.use('/auth', authRouter);

vendor.use(
  '/products',
  passport.authenticate('shop-owner-jwt', { session: false }),
  productRoutes
);

vendor.use(
  '/shop',
  passport.authenticate('shop-owner-jwt', { session: false }),
  shopRoutes
);

vendor.use(
  '/orders',
  passport.authenticate('shop-owner-jwt', { session: false }),
  orderRoutes
);

vendor.use(
  '/return',
  passport.authenticate('shop-owner-jwt', { session: false }),
  returnRouter
);

vendor.use(
  '/',
  passport.authenticate('shop-owner-jwt', { session: false }),
  protectedRouter
);

export default vendor;
