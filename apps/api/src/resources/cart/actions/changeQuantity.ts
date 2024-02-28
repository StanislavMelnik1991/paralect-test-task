import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';
import { userService } from 'resources/user';
import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const isRoundedToTwoDecimalPlaces = (value: number) => {
  return Number(value.toFixed(0)) === value;
};

const schema = z.object({
  productId: z.string(),
  quantity: z.number().min(0).refine(isRoundedToTwoDecimalPlaces),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: userId, cart } = ctx.state.user;
  const { productId, quantity } = ctx.validatedData;

  const product = await productService.findOne({ _id: productId });
  const cartProduct = cart.current.find((val) => val.productId === productId);


  if (
    !cartProduct
    || !product
  ) {
    ctx.throw('Product not found at cart', 404);
  }
  ctx.assertClientError((product.quantity + cartProduct.quantity - quantity) >= 0, {
    quantity: 'Out of stock',
  });

  await productService.updateOne(
    { _id: productId },
    () => ({
      quantity: product.quantity + cartProduct.quantity - quantity,
      pending: product.pending + quantity - cartProduct.quantity,
    }),
  );

  cartProduct.quantity = quantity;
  cart.current = cart.current.filter((prod) => prod.quantity > 0);


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
  router.put('/', validateMiddleware(schema), handler);
};
