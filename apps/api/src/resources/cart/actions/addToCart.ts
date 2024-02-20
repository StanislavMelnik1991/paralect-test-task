import { z } from 'zod';

import { AppKoaContext, AppRouter, Product } from 'types';

import { cartService } from 'resources/cart';
import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const schema = z.object({
  productId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: userId } = ctx.state.user;
  const { productId } = ctx.validatedData;

  const product = await productService.findOne({
    _id: productId,
  });
  const cart = await cartService.findOne({ userId, isPaid: false });

  ctx.assertClientError(product && !product.isSold, {
    credentials: 'Product not found',
  });

  if (!cart) {
    const newCart = await cartService.insertOne({ userId, isPaid: false, products: [{ productId }] });
    ctx.body = { cart: newCart };
    return;
  }

  cart.products.push({ productId });
  await cartService.updateOne(
    { _id: cart._id },
    () => (cart),
  );
  analyticsService.track('User add product to basket', {
    userId,
    productId,
  });
  ctx.body = { cart };
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
