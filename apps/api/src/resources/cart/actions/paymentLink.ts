import { AppKoaContext, AppRouter } from 'types';

import { productService } from 'resources/product';

import { analyticsService, stripeService } from 'services';

async function handler(ctx: AppKoaContext) {
  const { _id: userId, cart } = ctx.state.user;

  
  ctx.assertClientError(cart && cart.current.length, {
    credentials: 'Cart not found',
  });
  const products = await Promise.all(cart.current.map(async ({ productId, quantity }) => {
    const product = await productService.findOne({ _id: productId });
    ctx.assertClientError(product, {
      credentials: 'Product not found',
    });
    return { price: product.price as number, name: product.name, quantity };
  }));
  const { url } = await stripeService.createPaymentLink({ userId, products });

  analyticsService.track('User generate payment link', {
    userId,
  });
  ctx.body = { link: url };
}

export default (router: AppRouter) => {
  router.post('/bue', handler);
};
