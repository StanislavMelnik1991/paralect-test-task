import { AppKoaContext, AppRouter } from 'types';

import { cartService } from 'resources/cart';
import { productService } from 'resources/product';

import { analyticsService, stripeService } from 'services';

async function handler(ctx: AppKoaContext) {
  const { _id: userId } = ctx.state.user;

  const cart = await cartService.findOne({ userId, isPaid: false });
  
  ctx.assertClientError(cart && cart.products.length, {
    credentials: 'Cart not found',
  });
  const products = await Promise.all(cart.products.map(async ({ productId, quantity }) => {
    const product = await productService.findOne({ _id: productId });
    ctx.assertClientError(product, {
      credentials: 'Product not found',
    });
    return { price: product.price as number, name: product.name, quantity };
  }));
  const { url } = await stripeService.createPaymentLink({ cartId: cart._id, products });

  analyticsService.track('User add product to basket', {
    userId,
    cart: cart._id,
  });
  ctx.body = { link: url };
}

export default (router: AppRouter) => {
  router.post('/bue', handler);
};
