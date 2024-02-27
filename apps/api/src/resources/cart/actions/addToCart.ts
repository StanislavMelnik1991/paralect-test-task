import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';
import { userService } from 'resources/user';
import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const schema = z.object({
  productId: z.string(),
  quantity: z.number().optional().default(1),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: userId, cart } = ctx.state.user;
  const { productId, quantity } = ctx.validatedData;

  const product = await productService.findOne({ _id: productId });

  if (!product || !product.quantity) {
    ctx.throw('Product not found at cart', 404);
  }

  await productService.updateOne(
    { _id: productId },
    () => ({
      quantity: product.quantity - quantity,
      pending: product.pending + quantity,
    }),
  );
  const existed = cart.current.find((val) => val.productId === productId);
  if (existed) {
    existed.quantity += quantity;
  } else {
    cart.current.push({ productId, quantity, price: product.price });
  }
  await userService.updateOne(
    { _id: userId },
    () => ({ cart }),
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
