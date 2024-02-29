import { AppKoaContext, AppRouter, CartProduct } from 'types';
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
  const items: Array<CartProduct> = await Promise.all(cart.current.map(async ({ productId, ...old }) => {
    const product = await productService.findOne({ _id: productId });
    ctx.assertClientError(product, {
      productId: 'Product not found',
    });
    return {
      ...productService.getCartFields(product),
      ...old,
      available: product.quantity,
    } as CartProduct;
  }));
  const amount = cart.current.reduce((total, product) => total + (product.price * product.quantity), 0);
  const count = cart.current.reduce((total, product) => total + product.quantity, 0);

  ctx.body = {
    items,
    amount,
    count,
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
