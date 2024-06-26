import mount from 'koa-mount';

import { AppKoa, AppRouter } from 'types';

import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';
import { productRoutes } from 'resources/product';
import { cartRoutes } from 'resources/cart';

const healthCheckRouter = new AppRouter();
healthCheckRouter.get('/health', ctx => ctx.status = 200);

export default (app: AppKoa) => {
  app.use(healthCheckRouter.routes());
  app.use(mount('/account', accountRoutes.publicRoutes));
  app.use(mount('/users', userRoutes.publicRoutes));
  app.use(mount('/products', productRoutes.publicRoutes));
  app.use(mount('/cart', cartRoutes.publicRoutes));
};
