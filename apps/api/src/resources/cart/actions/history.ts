import { AppKoaContext, AppRouter } from 'types';
import { productService } from 'resources/product';

async function handler(ctx: AppKoaContext) {
  const { cart } = ctx.state.user;
  if (!cart) {
    ctx.body = {
      items: [],
      amount: 0,
      count: 0,
    };
    return;
  }
  const items = await Promise.all(cart.history.map(async ({ productId, quantity, price }) => {
    const product = await productService.findOne({ _id: productId });
    ctx.assertClientError(product && product.quantity >= 0, {
      productId: 'Product not found',
    });
    return { ...product, quantity, price };
  }));
  const amount = cart.history.reduce((total, product) => total + (product.price  * product.quantity), 0);
  const count = cart.history.reduce((total, product) => total + product.quantity, 0);

  ctx.body = {
    items,
    amount,
    count,
  };
}

export default (router: AppRouter) => {
  router.get('/history', handler);
};
