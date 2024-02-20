import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';
import { firebaseService } from 'services';

const schema = z.object({
  name: z.string(),
  price: z.number().min(1),
  quantity: z.number().min(1).optional().default(1),
  image: z.string().url(),
});

type ValidatedData = z.infer<typeof schema>;


async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: createdBy, email } = ctx.state.user;
  const { name, price, image, quantity } = ctx.validatedData;

  const product = await productService.insertOne({
    createdBy,
    name,
    price,
    quantity,
    sold: 0,
  });
  
  const fileName = await firebaseService.rename(image, `${email}/products/${name}-${product._id}`);
  const updatedUser = await productService.updateOne(
    { _id: product._id },
    () => ({ image: fileName }),
  );

  analyticsService.track('New product created', {
    name,
  });

  ctx.body = { product: updatedUser };
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
