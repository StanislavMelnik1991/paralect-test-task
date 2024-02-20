import { AppKoaContext, AppRouter } from 'types';

import { cartService } from 'resources/cart';
import { productService } from 'resources/product';

async function handler(ctx: AppKoaContext) {
  const { _id: userId } = ctx.state.user;
  const cart = await cartService.findOne({ isPaid: false, userId });
  if (!cart) {
    ctx.body = {
      items: [],
      amount: 0,
      count: 0,
    };
    return;
  }
  const products = await Promise.all(cart.products.map(async ({ productId, quantity }) => {
    const product = await productService.findOne({ _id: productId });
    ctx.assertClientError(product && product.quantity >= 0, {
      credentials: 'Product not found',
    });
    return { ...product, quantity };
  }));
  const amount = products.reduce((total, product) => total + (product.price  * product.quantity), 0);
  ctx.body = {
    items: products,
    amount,
    count: products.length,
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
