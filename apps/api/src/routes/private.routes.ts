import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa } from 'types';

import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';
import { productRoutes } from 'resources/product';
import { cartRoutes } from 'resources/cart';

import auth from './middlewares/auth.middleware';

export default (app: AppKoa) => {
  app.use(mount('/account', compose([auth, accountRoutes.privateRoutes])));
  app.use(mount('/users', compose([auth, userRoutes.privateRoutes])));
  app.use(mount('/me/products', compose([auth, productRoutes.privateRoutes])));
  app.use(mount('/me/cart', compose([auth, cartRoutes.privateRoutes])));
};
