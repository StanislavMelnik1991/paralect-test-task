import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { cartService } from 'resources/cart';
import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const schema = z.object({
  productId: z.string(),
  quantity: z.number().optional().default(1),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: userId } = ctx.state.user;
  const { productId, quantity } = ctx.validatedData;

  const product = await productService.findOne({
    _id: productId,
  });
  const cart = await cartService.findOne({ userId, isPaid: false });

  ctx.assertClientError(product && product.quantity >= 0, {
    credentials: 'Product not found',
  });

  ctx.assertClientError(product.quantity >= quantity, {
    credentials: 'Not enough quantity',
  });

  await productService.updateOne(
    { _id: productId },
    () => ({
      quantity: product.quantity - quantity,
      pending: product.pending + quantity,
    }),
  );
  if (!cart) {
    const newCart = await cartService.insertOne({ userId, isPaid: false, products: [{ productId, quantity }] });
    ctx.body = { cart: newCart };
    return;
  }
  const existed = cart.products.find((val) => val.productId === productId);
  if (existed) {
    existed.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }
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
